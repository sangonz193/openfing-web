create table course_class_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) not null,
  course_class_id uuid references course_classes(id) not null,
  created_at timestamp with time zone default now(),
  title text not null,
  description text,
  start_at bigint not null,
  end_at bigint
);

alter table course_class_bookmarks enable row level security;

create policy select_if_own
on course_class_bookmarks
for select
using (auth.uid() = user_id);

create policy insert_if_own
on course_class_bookmarks
for insert
with check (auth.uid() = user_id);

create policy update_if_own
on course_class_bookmarks
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy delete_if_own
on course_class_bookmarks
for delete
using (auth.uid() = user_id);
