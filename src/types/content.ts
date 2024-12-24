export type ContentStatus = 'draft' | 'published' | 'archived'

export interface ContentWithAuthor {
  id: string
  title: string
  content: unknown
  created_by: { display_name: string }
  created_at: string
  updated_at: string
  status: ContentStatus
  version: number
}