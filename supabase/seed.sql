insert into public.categories (name, slug) values
  ('FEED & Engineering', 'feed-engineering'),
  ('Detailed Engineering', 'detailed-engineering'),
  ('Workforce & Training', 'workforce-training')
on conflict (slug) do nothing;

insert into public.tags (name, slug) values
  ('FEED', 'feed'), ('Project Delivery', 'project-delivery'), ('EPC', 'epc'),
  ('3D Modelling', '3d-modelling'), ('QA/QC', 'qaqc'), ('Engineering Training', 'engineering-training'), ('Workforce', 'workforce')
on conflict (slug) do nothing;

insert into public.posts (title, slug, excerpt, content, cover_image, author_name, status, published_at) values
(
  'How FEED creates safer, more predictable project delivery',
  'how-feed-creates-safer-more-predictable-project-delivery',
  'A practical look at how front-end engineering design reduces uncertainty before a project moves into detailed execution.',
  $$ {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Front-end engineering design aligns process, piping, electrical and instrumentation requirements before cost and schedule commitments harden."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Reduce uncertainty before it becomes rework"}]},{"type":"paragraph","content":[{"type":"text","text":"A disciplined FEED phase tests constructability, interfaces, safety requirements and operating constraints early. The result is a stronger basis for tendering, procurement and detailed engineering."}]}]} $$::jsonb,
  '/media/page-services-hero.png', 'Saur Engineering Team', 'published', '2026-09-18T09:00:00Z'
),
(
  'Detailed engineering deliverables that keep EPC execution moving',
  'detailed-engineering-deliverables-for-epc-execution',
  'The drawings, models, calculations and schedules that translate an approved concept into safe, buildable work.',
  $$ {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Detailed engineering turns an approved design into coordinated information that procurement, fabrication and construction teams can use with confidence."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"One coordinated source of technical truth"}]},{"type":"paragraph","content":[{"type":"text","text":"A multidisciplinary delivery model prevents downstream teams from reconciling conflicting drawings, models and schedules."}]}]} $$::jsonb,
  '/media/expertise-design-office.png', 'Saur Engineering Team', 'published', '2026-09-15T09:00:00Z'
),
(
  'Building a project-ready engineering workforce',
  'building-a-project-ready-engineering-workforce',
  'Why practical software capability, discipline knowledge and project readiness must develop together.',
  $$ {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Engineering capability is more than a list of software tools. Project teams need people who understand design intent, standards and multidisciplinary interfaces."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Training that connects tools to outcomes"}]},{"type":"paragraph","content":[{"type":"text","text":"Targeted development gives engineers a usable workflow from interpreting inputs through to checking outputs and communicating technical decisions."}]}]} $$::jsonb,
  '/media/page-training-hero.png', 'Saur Engineering Team', 'published', '2026-09-10T09:00:00Z'
)
on conflict (slug) do nothing;

insert into public.post_categories (post_id, category_id)
select posts.id, categories.id from public.posts posts join public.categories categories on
  (posts.slug = 'how-feed-creates-safer-more-predictable-project-delivery' and categories.slug = 'feed-engineering') or
  (posts.slug = 'detailed-engineering-deliverables-for-epc-execution' and categories.slug = 'detailed-engineering') or
  (posts.slug = 'building-a-project-ready-engineering-workforce' and categories.slug = 'workforce-training')
on conflict do nothing;
