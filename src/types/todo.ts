export interface Todo {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  completed: number;
  created_at: string;
  updated_at: string;
}
