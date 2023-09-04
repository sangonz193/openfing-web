CREATE TABLE data.course_classes (
  id uuid default uuid_generate_v4() primary key,
  name text,
  number smallint,
  visibility data.visibility not null default 'public',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  published_at timestamp with time zone,
  course_class_list_id uuid references data.course_class_lists(id) on delete cascade
);

create view public.course_class as
select id,
    name,
    number,
    visibility,
    created_at,
    updated_at,
    course_class_list_id
from data.course_classes
where deleted_at is null;

comment on view public.course_class is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "courseClass",
      "local_columns": ["course_class_list_id"],
      "foreign_name": "courseClassList",
      "foreign_schema": "public",
      "foreign_table": "course_class_list",
      "foreign_columns": ["id"]
    }
  ]
})';
