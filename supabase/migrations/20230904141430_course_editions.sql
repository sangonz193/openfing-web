create table data.course_editions (
  id uuid default uuid_generate_v4() primary key,
  name character varying,
  semester integer not null,
  year integer,
  visibility data.visibility not null default 'public',
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone,
  course_id uuid references data.courses(id) on delete cascade
);

create view public.course_edition as
select id,
    name,
    semester,
    year,
    visibility,
    created_at,
    updated_at,
    course_id
from data.course_editions
where deleted_at is null;

comment on view public.course_edition is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "editions",
      "local_columns": ["course_id"],
      "foreign_name": "course",
      "foreign_schema": "public",
      "foreign_table": "course",
      "foreign_columns": ["id"]
    }
  ]
})';
