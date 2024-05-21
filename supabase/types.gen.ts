export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      course_class_bookmarks: {
        Row: {
          course_class_id: string
          created_at: string | null
          description: string | null
          end_at: number | null
          id: string
          start_at: number | null
          title: string
          user_id: string
        }
        Insert: {
          course_class_id: string
          created_at?: string | null
          description?: string | null
          end_at?: number | null
          id?: string
          start_at?: number | null
          title: string
          user_id: string
        }
        Update: {
          course_class_id?: string
          created_at?: string | null
          description?: string | null
          end_at?: number | null
          id?: string
          start_at?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_class_bookmarks_course_class_id_fkey"
            columns: ["course_class_id"]
            isOneToOne: false
            referencedRelation: "course_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_class_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_class_lists: {
        Row: {
          code: string
          course_edition_id: string
          created_at: string
          created_by_id: string | null
          deleted_at: string | null
          deleted_by_id: string | null
          id: string
          name: string
          updated_at: string | null
          updated_by_id: string | null
          visibility: string
        }
        Insert: {
          code: string
          course_edition_id: string
          created_at: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          id?: string
          name: string
          updated_at?: string | null
          updated_by_id?: string | null
          visibility: string
        }
        Update: {
          code?: string
          course_edition_id?: string
          created_at?: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          updated_by_id?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_class_lists_course_edition_id_fkey"
            columns: ["course_edition_id"]
            isOneToOne: false
            referencedRelation: "course_editions"
            referencedColumns: ["id"]
          },
        ]
      }
      course_class_view: {
        Row: {
          course_class_id: string
          created_at: string | null
          id: string
          progress: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          course_class_id: string
          created_at?: string | null
          id?: string
          progress: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          course_class_id?: string
          created_at?: string | null
          id?: string
          progress?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_class_view_course_class_id_fkey"
            columns: ["course_class_id"]
            isOneToOne: false
            referencedRelation: "course_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_class_view_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_classes: {
        Row: {
          course_class_list_id: string
          created_at: string
          created_by_id: string | null
          deleted_at: string | null
          deleted_by_id: string | null
          id: string
          name: string
          number: number
          published_at: string | null
          updated_at: string | null
          updated_by_id: string | null
          visibility: string
        }
        Insert: {
          course_class_list_id: string
          created_at: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          id?: string
          name: string
          number: number
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: string | null
          visibility: string
        }
        Update: {
          course_class_list_id?: string
          created_at?: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          id?: string
          name?: string
          number?: number
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_classes_course_class_list_id_fkey"
            columns: ["course_class_list_id"]
            isOneToOne: false
            referencedRelation: "course_class_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      course_editions: {
        Row: {
          course_id: string
          created_at: string
          created_by_id: string | null
          deleted_at: string | null
          deleted_by_id: string | null
          id: string
          name: string
          semester: number
          updated_at: string | null
          updated_by_id: string | null
          visibility: string
          year: number
        }
        Insert: {
          course_id: string
          created_at: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          id: string
          name: string
          semester: number
          updated_at?: string | null
          updated_by_id?: string | null
          visibility: string
          year: number
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          id?: string
          name?: string
          semester?: number
          updated_at?: string | null
          updated_by_id?: string | null
          visibility?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_editions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          created_at: string
          created_by_id: string | null
          deleted_at: string | null
          deleted_by_id: string | null
          eva: string | null
          icon_url: string | null
          id: string
          name: string
          updated_at: string | null
          updated_by_id: string | null
          visibility: string
          latest_course_class_list: unknown | null
        }
        Insert: {
          code: string
          created_at: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          eva?: string | null
          icon_url?: string | null
          id: string
          name: string
          updated_at?: string | null
          updated_by_id?: string | null
          visibility: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          eva?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          updated_by_id?: string | null
          visibility?: string
        }
        Relationships: []
      }
      favorite_courses: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      latest_course_class_list: {
        Args: {
          "": unknown
        }
        Returns: {
          code: string
          course_edition_id: string
          created_at: string
          created_by_id: string | null
          deleted_at: string | null
          deleted_by_id: string | null
          id: string
          name: string
          updated_at: string | null
          updated_by_id: string | null
          visibility: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

