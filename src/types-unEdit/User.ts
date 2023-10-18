import { CartItem } from "./Product";

export interface User {
  email: string;
  name: string;
  bday: string;
  date: string;
  status: number;
  add: string;
  phone: string;
  img: string;
  cart: CartItem[];
  user_id?: number;
  resetPassword?: string;
}

export interface UserLogined {
  user_id: number;
  email: string;
  name: string;
  bday: string;
  date: string;
  status: number;
  add_address: string;
  phone: number;
  img: string;
  cart: CartItem[];
}

export interface UserState {
  userLogined: UserLogined | null;
  users: User[];
  searchFilter: string;
  filter: any | null; // Specify the type of filter if known
}
