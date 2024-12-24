export interface Build {
  id: string
  user_id: string
  name: string
  description?: string
  build_volume: {
    x: number
    y: number
    z: number
    units: string
  }
  parts: BuildPart[]
  images: BuildImage[]
  created_at: string
}

export interface BuildPart {
  id: string
  name: string
  quantity: number
  notes?: string
  attributes?: Record<string, unknown>
}

export interface BuildImage {
  url: string
  type: string
  alt?: string
  caption?: string
}

export interface BuildQueryParams {
  userId?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type BuildFormData = Omit<Build, 'id' | 'created_at'>