create table course_class_view(
  id uuid primary key default gen_random_uuid(),
  course_class_id uuid references course_classes not null,
  user_id uuid references users not null,
  progress integer not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table course_class_view enable row level security;

create policy select_if_own
on course_class_view
for select
using (auth.uid() = user_id);

create policy insert_if_own
on course_class_view
for insert
with check (auth.uid() = user_id);

create policy update_if_own
on course_class_view
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy delete_if_own
on course_class_view
for delete
using (auth.uid() = user_id);
