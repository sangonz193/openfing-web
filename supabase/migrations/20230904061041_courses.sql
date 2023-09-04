create type data.visibility as enum('public', 'hidden', 'disabled');

create table data.courses (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  visibility data.visibility not null default 'public',
  code text not null,
  icon_url text,
  eva text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone,
  unique (code)
);

create view public.course as
select id,
    name,
    visibility,
    code,
    icon_url,
    eva,
    created_at,
    updated_at
from data.courses
where deleted_at is null;

comment on view public.course is e'@graphql({"primary_key_columns": ["id"]})';
