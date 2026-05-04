export type TaskStatus = 'pendente' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  createdAt: string;
  updatedAt: string;
}