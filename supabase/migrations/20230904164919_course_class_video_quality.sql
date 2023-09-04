CREATE TABLE data.course_class_video_qualities (
  id uuid default uuid_generate_v4() primary key,
  width integer,
  height integer,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  course_class_video_id uuid references data.course_class_videos(id) on delete cascade
);

create view public.course_class_video_quality as
select id,
    width,
    height,
    created_at,
    updated_at,
    course_class_video_id
from data.course_class_video_qualities
where deleted_at is null;

comment on view public.course_class_video_quality is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "qualities",
      "local_columns": ["course_class_video_id"],
      "foreign_name": "video",
      "foreign_schema": "public",
      "foreign_table": "course_class_video",
      "foreign_columns": ["id"]
    }
  ]
})';
