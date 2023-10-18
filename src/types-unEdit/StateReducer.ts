import { ProductState } from "./Product";
import { UserState } from "./User";
import { OrderState } from "./Order";
import { MessState } from "./Mess";
import { AdminState } from "./Admin";

export interface State {
  productReducer: ProductState;
  userReducer: UserState;
  orderReducer: OrderState;
  messReducer: MessState;
  adminReducer: AdminState;
}
