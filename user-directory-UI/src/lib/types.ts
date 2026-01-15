export type UserDTO = {
  name: string;
  age: number;
  city: string;
  state: string;
  pincode: string;
};

export type User = UserDTO & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
