export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

export interface CategorySelectProps {
  selectedId: string;
  onSelect: (id: string) => void;
}