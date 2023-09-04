CREATE TABLE data.course_class_video_formats (
  id uuid default uuid_generate_v4() primary key,
  name text,
  url text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  course_class_video_quality_id uuid references data.course_class_video_qualities(id) on delete cascade
);

create view public.course_class_video_format as
select id,
    name,
    url,
    created_at,
    updated_at,
    course_class_video_quality_id
from data.course_class_video_formats
where deleted_at is null;

comment on view public.course_class_video_format is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "formats",
      "local_columns": ["course_class_video_quality_id"],
      "foreign_name": "quality",
      "foreign_schema": "public",
      "foreign_table": "course_class_video_quality",
      "foreign_columns": ["id"]
    }
  ]
})';
