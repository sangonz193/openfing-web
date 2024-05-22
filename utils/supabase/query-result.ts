import { GetResult } from "@supabase/postgrest-js/dist/main/select-query-parser"

import { Database } from "@/supabase/types"

export type QueryResult<
  TTable extends keyof Database["public"]["Tables"],
  TQuery extends string,
> = GetResult<
  Database["public"],
  Database["public"]["Tables"][TTable]["Row"],
  any,
  Database["public"]["Tables"][TTable]["Relationships"],
  TQuery
>
