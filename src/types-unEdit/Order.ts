import { CartItem } from "./Product";

export interface Order {
  id: number;
  email: string;
  cart: Array<CartItem>;
  address: address;
  date: string;
  status: number;
}

export interface OrderState {
  filter: number;
  searchFilter: string;
  orders: Order[];
}

interface address {
  name: string;
  address: string;
  phoneNumber: number | undefined;
  note: string | undefined;
}
