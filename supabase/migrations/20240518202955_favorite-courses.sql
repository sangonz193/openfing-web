create table favorite_courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users not null,
  course_id uuid references courses not null,
  created_at timestamp with time zone default now()
);

alter table favorite_courses enable row level security;

create policy select_if_own
on favorite_courses
for select
using (auth.uid() = user_id);

create policy insert_if_own
on favorite_courses
for insert
with check (auth.uid() = user_id);

create policy delete_if_own
on favorite_courses
for delete
using (auth.uid() = user_id);
