create table course_editions (
  name text not null,
  semester integer not null,
  year integer not null,
  visibility text not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone,
  course_id uuid not null references courses(id),
  id uuid not null primary key,
  created_by_id uuid,
  updated_by_id uuid,
  deleted_by_id uuid
);

alter table course_editions enable row level security;

create policy select_course_editions
on course_editions
for select
using (true);
