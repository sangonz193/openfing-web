create table course_classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  number integer not null,
  visibility text not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone,
  published_at timestamp with time zone,
  course_class_list_id uuid not null references course_class_lists(id),
  created_by_id uuid,
  updated_by_id uuid,
  deleted_by_id uuid
);

alter table course_classes enable row level security;

create policy select_course_classes
on course_classes
for select
using (true);
