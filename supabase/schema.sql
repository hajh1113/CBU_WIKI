-- Run this in the connected Supabase project before publishing.
create table if not exists public.wiki_pages (
  id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null,
  excerpt text not null default '', body text not null default '', category text, generation integer,
  is_published boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.wiki_pages enable row level security;
create policy "Published pages are publicly readable" on public.wiki_pages for select using (is_published = true);
create index if not exists wiki_pages_updated_at_idx on public.wiki_pages (updated_at desc);
create index if not exists wiki_pages_category_idx on public.wiki_pages (category);
insert into public.wiki_pages (slug, title, excerpt, body, category) values
  ('CBU-위키-작성-가이드', 'CBU 위키 작성 가이드', '좋은 문서를 함께 만드는 기본 원칙과 분류 방법', '관련 문서와 연결하고, 확인된 정보의 출처를 남겨주세요.', '안내'),
  ('프로젝트-아카이브', '프로젝트 아카이브', '분야별 프로젝트를 한눈에 찾는 방법', '기수, 주제, 기술 스택으로 프로젝트를 정리합니다.', '아카이브'),
  ('커뮤니티-이용-안내', '커뮤니티 이용 안내', '서로를 존중하는 기록을 위한 약속', '개인에 대한 공격이나 확인되지 않은 내용을 기록하지 않습니다.', '안내')
on conflict (slug) do nothing;
