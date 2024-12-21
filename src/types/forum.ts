export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    display_name: string | null;
  } | null;
  replies: Array<{ count: number }>;
  flags: Array<{ count: number }>;
  created_at: string;
}

export interface NewThread {
  title: string;
  content: string;
}