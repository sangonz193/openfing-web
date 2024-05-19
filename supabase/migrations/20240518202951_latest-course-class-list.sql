create or replace function latest_course_class_list(courses) returns setof course_class_lists rows 1 as $$
  select *
  from course_class_lists
  where course_edition_id = (
    select id
    from course_editions
    where course_id = $1.id
    order by year desc, semester desc, created_at desc
    limit 1
  )
  order by created_at desc limit 1;
$$ language sql stable;
