-- Public discovery uses bounded database pagination instead of loading every article body.
create or replace function public.blog_index(p_query text default '', p_category text default '', p_page integer default 1, p_page_size integer default 6)
returns jsonb language sql stable security invoker set search_path=public as $$
 with eligible as (
   select p.* from public.posts p
   where p.status='published' and p.deleted_at is null
   and (p_category='' or exists(select 1 from public.post_categories pc join public.categories c on c.id=pc.category_id where pc.post_id=p.id and c.name=p_category))
   and (p_query='' or position(lower(p_query) in lower(p.title || ' ' || p.excerpt || ' ' || p.author_name))>0
     or exists(select 1 from public.post_tags pt join public.tags t on t.id=pt.tag_id where pt.post_id=p.id and position(lower(p_query) in lower(t.name))>0)
     or exists(select 1 from public.post_categories pc join public.categories c on c.id=pc.category_id where pc.post_id=p.id and position(lower(p_query) in lower(c.name))>0))
 ), page_rows as (
   select * from eligible order by published_at desc,id limit least(24,greatest(1,p_page_size)) offset (greatest(1,p_page)::bigint-1)*least(24,greatest(1,p_page_size))
 )
 select jsonb_build_object(
   'count',(select count(*) from eligible),
   'posts',coalesce((select jsonb_agg(to_jsonb(p) || jsonb_build_object(
     'post_categories',coalesce((select jsonb_agg(jsonb_build_object('categories',jsonb_build_object('name',c.name))) from public.post_categories pc join public.categories c on c.id=pc.category_id where pc.post_id=p.id),'[]'::jsonb),
     'post_tags',coalesce((select jsonb_agg(jsonb_build_object('tags',jsonb_build_object('name',t.name))) from public.post_tags pt join public.tags t on t.id=pt.tag_id where pt.post_id=p.id),'[]'::jsonb)
   ) order by p.published_at desc,p.id) from page_rows p),'[]'::jsonb),
   'categories',coalesce((select jsonb_agg(name order by name) from (select distinct c.name from public.categories c join public.post_categories pc on pc.category_id=c.id join public.posts p on p.id=pc.post_id where p.status='published' and p.deleted_at is null) topics),'[]'::jsonb)
 );
$$;
grant execute on function public.blog_index(text,text,integer,integer) to anon,authenticated;
