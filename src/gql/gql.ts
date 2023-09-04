/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tfragment CourseSearchCourse on Course {\n\t\tid\n\t\tname\n\t\tcode\n\t}\n": types.CourseSearchCourseFragmentDoc,
    "\n\tfragment CourseItemCourse on Course {\n\t\tid\n\n\t\tcode\n\t\tname\n\t\teva\n\t\ticonUrl\n\n\t\teditions {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tyear\n\n\t\t\t\t\tcourseClassLists {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tcode\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.CourseItemCourseFragmentDoc,
    "\n\tquery CoursesQuery {\n\t\tcourseCollection(orderBy: [{ name: AscNullsLast }]) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...CourseItemCourse\n\t\t\t\t\t...CourseSearchCourse\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.CoursesQueryDocument,
    "\n\tfragment FaqItemFaq on Faq {\n\t\tid\n\t\ttitle\n\t\tcontent\n\t\tisHtml\n\t}\n": types.FaqItemFaqFragmentDoc,
    "\n\tquery FaqQuery {\n\t\tfaqCollection(orderBy: [{ position: AscNullsLast }]) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\t...FaqItemFaq\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.FaqQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment CourseSearchCourse on Course {\n\t\tid\n\t\tname\n\t\tcode\n\t}\n"): (typeof documents)["\n\tfragment CourseSearchCourse on Course {\n\t\tid\n\t\tname\n\t\tcode\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment CourseItemCourse on Course {\n\t\tid\n\n\t\tcode\n\t\tname\n\t\teva\n\t\ticonUrl\n\n\t\teditions {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tyear\n\n\t\t\t\t\tcourseClassLists {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tcode\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment CourseItemCourse on Course {\n\t\tid\n\n\t\tcode\n\t\tname\n\t\teva\n\t\ticonUrl\n\n\t\teditions {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tyear\n\n\t\t\t\t\tcourseClassLists {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tcode\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery CoursesQuery {\n\t\tcourseCollection(orderBy: [{ name: AscNullsLast }]) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...CourseItemCourse\n\t\t\t\t\t...CourseSearchCourse\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery CoursesQuery {\n\t\tcourseCollection(orderBy: [{ name: AscNullsLast }]) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...CourseItemCourse\n\t\t\t\t\t...CourseSearchCourse\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment FaqItemFaq on Faq {\n\t\tid\n\t\ttitle\n\t\tcontent\n\t\tisHtml\n\t}\n"): (typeof documents)["\n\tfragment FaqItemFaq on Faq {\n\t\tid\n\t\ttitle\n\t\tcontent\n\t\tisHtml\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery FaqQuery {\n\t\tfaqCollection(orderBy: [{ position: AscNullsLast }]) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\t...FaqItemFaq\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery FaqQuery {\n\t\tfaqCollection(orderBy: [{ position: AscNullsLast }]) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\t...FaqItemFaq\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;