-- Use an explicit HTTP conflict status instead of a serialization error, which hosted gateways may retry.
create or replace function public.save_editor_post(p_id uuid, p_document jsonb, p_action text default 'save', p_expected_version bigint default 0)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
 current_post public.posts%rowtype;
 draft public.post_drafts%rowtype;
 data public.posts%rowtype;
 doc jsonb := p_document;
 previous jsonb;
 category_name text; taxonomy_id uuid;
 new_version bigint;
 schedule_time timestamptz;
begin
 if not public.is_admin() then raise exception 'Administrator access required.' using errcode = '42501'; end if;
 if p_action not in ('save','publish','schedule','unpublish') or jsonb_typeof(doc) <> 'object' then raise exception 'Invalid save request.'; end if;
 -- Lock the post even when two tabs attempt the first insert concurrently.
 perform pg_advisory_xact_lock(hashtextextended(p_id::text, 0));
 select * into current_post from public.posts where id = p_id for update;
 if current_post.deleted_at is not null then raise exception 'Restore this article from Trash before editing.'; end if;
 select * into draft from public.post_drafts where post_id = p_id for update;
 if coalesce(draft.version, 0) <> p_expected_version then raise exception 'CONFLICT: This article was saved in another tab. Reload before continuing.' using errcode = 'PT409'; end if;
 if current_post.original_published_at is not null and doc->>'slug' <> current_post.slug then raise exception 'Published article URLs cannot be changed.'; end if;
 if p_action = 'schedule' and current_post.status = 'published' then raise exception 'Unpublish this article before scheduling a new release.'; end if;
 if p_action in ('publish','schedule') and (length(trim(coalesce(doc->>'title',''))) < 8 or length(trim(coalesce(doc->>'excerpt',''))) < 30 or coalesce(doc->>'slug','') = '' or coalesce(doc->>'author_name','') = '' or coalesce(jsonb_array_length(doc->'categories'),0) = 0 or doc->'content'->>'type' is distinct from 'doc') then raise exception 'Complete the title, URL, summary, topic, author and article before publishing.'; end if;
 if p_action = 'schedule' then
   schedule_time := (doc->>'scheduled_for')::timestamptz;
   if schedule_time is null or schedule_time <= now() then raise exception 'Choose a future publication date.'; end if;
 end if;
 doc := doc || jsonb_build_object('slug',coalesce(nullif(doc->>'slug',''),'draft-' || p_id::text));
 if current_post.id is null then
   insert into public.posts(id,title,slug,excerpt,content,status) values(p_id,coalesce(nullif(doc->>'title',''),'Untitled article'),doc->>'slug',coalesce(doc->>'excerpt',''),coalesce(doc->'content','{"type":"doc","content":[]}'::jsonb),'draft');
   select * into current_post from public.posts where id = p_id;
 else
   previous := coalesce(draft.document, to_jsonb(current_post) || jsonb_build_object('categories',coalesce((select jsonb_agg(c.name) from public.categories c join public.post_categories pc on pc.category_id=c.id where pc.post_id=p_id),'[]'::jsonb),'tags',coalesce((select jsonb_agg(t.name) from public.tags t join public.post_tags pt on pt.tag_id=t.id where pt.post_id=p_id),'[]'::jsonb)));
   insert into public.post_revisions(post_id,snapshot,created_by) values(p_id,previous,auth.uid());
 end if;
 new_version := coalesce(draft.version,0)+1;
 insert into public.post_drafts(post_id,document,version,updated_at,updated_by) values(p_id,doc,new_version,now(),auth.uid()) on conflict(post_id) do update set document=excluded.document,version=excluded.version,updated_at=excluded.updated_at,updated_by=excluded.updated_by;
 -- Draft saves never modify a published or scheduled snapshot.
 if p_action <> 'save' or current_post.status = 'draft' then
   data := jsonb_populate_record(null::public.posts, doc);
   update public.posts set title=data.title, slug=data.slug, excerpt=data.excerpt, content=data.content, cover_image=data.cover_image, cover_alt=data.cover_alt, cover_caption=data.cover_caption, author_name=data.author_name, author_role=data.author_role, tech_takeaways=data.tech_takeaways, related_post_ids=data.related_post_ids, seo_title=data.seo_title, seo_description=data.seo_description, seo_focus_keyword=data.seo_focus_keyword, seo_canonical_url=data.seo_canonical_url, seo_og_title=data.seo_og_title, seo_og_description=data.seo_og_description, seo_og_image=data.seo_og_image, seo_twitter_title=data.seo_twitter_title, seo_twitter_description=data.seo_twitter_description, seo_twitter_image=data.seo_twitter_image, seo_schema_type=data.seo_schema_type, seo_no_index=data.seo_no_index,
     status = case when p_action = 'publish' then 'published' when p_action = 'schedule' then 'scheduled' else 'draft' end,
     published_at = case when p_action = 'publish' then coalesce(current_post.original_published_at,now()) else current_post.published_at end,
     original_published_at = case when p_action = 'publish' then coalesce(current_post.original_published_at,now()) else current_post.original_published_at end,
     published_by = case when p_action = 'publish' then auth.uid() else current_post.published_by end,
     scheduled_for = case when p_action = 'schedule' then schedule_time else null end,
     updated_at = now()
   where id = p_id;
   delete from public.post_categories where post_id=p_id;
   for category_name in select jsonb_array_elements_text(coalesce(doc->'categories','[]'::jsonb)) loop
     insert into public.categories(name,slug) values(category_name,trim(both '-' from regexp_replace(lower(category_name),'[^a-z0-9]+','-','g'))) on conflict(slug) do update set name=excluded.name returning id into taxonomy_id;
     insert into public.post_categories(post_id,category_id) values(p_id,taxonomy_id) on conflict do nothing;
   end loop;
   delete from public.post_tags where post_id=p_id;
   for category_name in select jsonb_array_elements_text(coalesce(doc->'tags','[]'::jsonb)) loop
     insert into public.tags(name,slug) values(category_name,trim(both '-' from regexp_replace(lower(category_name),'[^a-z0-9]+','-','g'))) on conflict(slug) do update set name=excluded.name returning id into taxonomy_id;
     insert into public.post_tags(post_id,tag_id) values(p_id,taxonomy_id) on conflict do nothing;
   end loop;
 end if;
 return jsonb_build_object('id',p_id,'version',new_version,'status',(select status from public.posts where id=p_id),'updatedAt',now());
end; $$;
