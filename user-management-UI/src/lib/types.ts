export type Task = {
  id: string;
  title: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type TaskDto = {
  id?: string;
  title: string;
  description: string;
  status: number;
};
