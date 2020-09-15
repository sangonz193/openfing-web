import * as Types from '../../generated/localSchema.types';

export type CourseItemCourseFragment = { __typename?: 'Course', id: string, code: string, name: string, eva: Types.Maybe<string>, iconUrl: Types.Maybe<string>, editions: Array<{ __typename?: 'CourseEdition', id: string, year: Types.Maybe<number>, courseClassLists: Array<{ __typename?: 'CourseClassList', id: string, code: string }> }> };
