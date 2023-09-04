CREATE TABLE data.course_class_chapter_cues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  start_seconds numeric not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  course_class_id uuid references data.course_classes(id) on delete cascade
);

create view public.course_class_chapter_cue as
select id,
    name,
    start_seconds,
    created_at,
    updated_at,
    course_class_id
from data.course_class_chapter_cues
where deleted_at is null;

comment on view public.course_class_chapter_cue is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "cues",
      "local_columns": ["course_class_id"],
      "foreign_name": "courseClass",
      "foreign_schema": "public",
      "foreign_table": "course_class",
      "foreign_columns": ["id"]
    }
  ]
})';
