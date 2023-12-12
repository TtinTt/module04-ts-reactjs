import { CartItem } from "./Product";

export interface User {
  email: string;
  name: string;
  bday: string;
  date: string;
  status: number;
  add: string;
  phone: number | string;
  img: string;
  cart: CartItem[];
  user_id?: number;
  resetPassword?: string;
}

export type UserLogined = Omit<User, "add" | "user_id" | "resetPassword"> & {
  user_id: number;
  add_address: string;
  [key: string]: any;
};

export interface UserState {
  userLogined: UserLogined | null;
  users: User[];
  searchFilter: string;
  filter: number | null;
}
