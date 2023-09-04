CREATE TABLE data.course_class_live_states (
  id uuid default uuid_generate_v4() primary key,
  html text,
  start_date timestamp with time zone,
  in_progress boolean,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  course_class_id uuid references data.course_classes(id) on delete cascade
);

create view public.course_class_live_state as
select id,
    html,
    start_date,
    in_progress,
    created_at,
    updated_at,
    course_class_id
from data.course_class_live_states
where deleted_at is null;

comment on view public.course_class_live_state is e'
@graphql({
  "primary_key_columns": ["id"],
  "foreign_keys": [
    {
      "local_name": "liveState",
      "local_columns": ["course_class_id"],
      "foreign_name": "courseClass",
      "foreign_schema": "public",
      "foreign_table": "course_class",
      "foreign_columns": ["id"]
    }
  ]
})';

create function public._course_class__course_class_live_state(rec public.course_class)
returns setof public.course_class_live_state rows 1
language sql
as $$
  select * from public.course_class_live_state where course_class_id = rec.id order by created_at desc limit 1;
$$;

comment on function public._course_class__course_class_live_state is e'
@graphql({
  "name": "liveState"
})';
