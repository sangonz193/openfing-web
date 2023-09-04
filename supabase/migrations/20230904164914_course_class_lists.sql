CREATE TABLE data.course_class_lists (
  id uuid default uuid_generate_v4() primary key,
  name text,
  code text,
  visibility data.visibility not null default 'public',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  course_edition_id uuid references data.course_editions(id) on delete cascade,
  unique (code)
);

create view public.course_class_list as
select id,
    name,
    code,
    visibility,
    created_at,
    updated_at,
    course_edition_id
from data.course_class_lists
where deleted_at is null;

comment on view public.course_class_list is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "courseClassLists",
      "local_columns": ["course_edition_id"],
      "foreign_name": "edition",
      "foreign_schema": "public",
      "foreign_table": "course_edition",
      "foreign_columns": ["id"]
    }
  ]
})';
