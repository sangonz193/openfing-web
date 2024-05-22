create or replace function next_class(course_classes) returns setof course_classes rows 1 as $$
  select * from course_classes where course_class_list_id = $1.course_class_list_id and number = $1.number + 1 limit 1;
$$ language sql stable;
