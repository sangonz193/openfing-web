create table courses (
  name text not null,
  visibility text not null,
  code text not null,
  icon_url text,
  eva text,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone,
  id uuid not null primary key,
  created_by_id uuid,
  updated_by_id uuid,
  deleted_by_id uuid
);

alter table courses enable row level security;

create policy select_courses
on courses
for select
using (true);
