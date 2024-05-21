delete from course_class_view
where (user_id, course_class_id, updated_at) not in (
  select user_id, course_class_id, max(updated_at)
  from course_class_view
  group by user_id, course_class_id
);

alter table course_class_view
add constraint unique_user_course_class unique (user_id, course_class_id);
