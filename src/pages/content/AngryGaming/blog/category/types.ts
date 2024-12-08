export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  created_at?: string;
}

export interface CategorySelectProps {
  selectedId: string;
  onSelect: (id: string) => void;
}