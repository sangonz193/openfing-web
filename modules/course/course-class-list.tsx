import { CourseClassItem } from "./course-class-item"

type Props = {
  courseClassListCode: string
  courseClasses: {
    id: string
    name: string
    number: number
  }[]
}

export function CourseClassList({ courseClassListCode, courseClasses }: Props) {
  return (
    <div className="gap-2">
      {courseClasses.map((courseClass) => (
        <CourseClassItem
          key={courseClass.id}
          courseClass={courseClass}
          courseClassListCode={courseClassListCode}
        />
      ))}
    </div>
  )
}
