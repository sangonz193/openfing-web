create table data.faqs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    content text not null,
    is_html boolean default false,
    position integer not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    deleted_at timestamp with time zone
);
create view public.faqs as
select id,
    title,
    content,
    is_html,
    position,
    created_at,
    updated_at
from data.faqs
where deleted_at is null;

comment on view public.faqs is e'@graphql({"primary_key_columns": ["id"]})';
