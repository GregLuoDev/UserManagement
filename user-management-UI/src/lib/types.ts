export type User = {
  id: string;
  title: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type UserDto = {
  id?: string;
  title: string;
  description: string;
  status: number;
};
