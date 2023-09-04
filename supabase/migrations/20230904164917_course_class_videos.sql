CREATE TABLE data.course_class_videos (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position smallint,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  course_class_id uuid references data.course_classes(id) on delete cascade
);

create view public.course_class_video as
select id,
    name,
    position,
    created_at,
    updated_at,
    course_class_id
from data.course_class_videos
where deleted_at is null;

comment on view public.course_class_video is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "videos",
      "local_columns": ["course_class_id"],
      "foreign_name": "courseClass",
      "foreign_schema": "public",
      "foreign_table": "course_class",
      "foreign_columns": ["id"]
    }
  ]
})';
