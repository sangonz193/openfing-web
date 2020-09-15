import * as Types from '../../generated/localSchema.types';

export type UpdateItemCourseClassFragment = { __typename?: 'CourseClass', id: string, number: Types.Maybe<number>, createdAt: Types.Maybe<string>, name: Types.Maybe<string>, courseClassList: Types.Maybe<{ __typename?: 'CourseClassList', id: string, code: string, courseEdition: Types.Maybe<{ __typename?: 'CourseEdition', id: string, course: Types.Maybe<{ __typename?: 'Course', id: string, name: string, iconUrl: Types.Maybe<string> }> }> }> };
