create table course_class_lists (
  name text not null,
  code text not null,
  visibility text not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone,
  course_edition_id uuid not null references course_editions(id),
  id uuid not null primary key default uuid_generate_v4(),
  created_by_id uuid,
  updated_by_id uuid,
  deleted_by_id uuid
);

alter table course_class_lists enable row level security;

create policy select_course_class_lists
on course_class_lists
for select
using (true);
