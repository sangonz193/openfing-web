import * as Types from '../../generated/localSchema.types';

export type CourseClassItemCourseClassFragment = { __typename?: 'CourseClass', id: string, name: Types.Maybe<string>, number: Types.Maybe<number>, courseClassList: Types.Maybe<{ __typename?: 'CourseClassList', id: string, code: string }> };
