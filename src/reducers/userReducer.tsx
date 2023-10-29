import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types-unEdit/Product";
import { User, UserLogined, UserState } from "../types-unEdit/User";

// Initial state
const initialState: UserState = {
  userLogined: null,
  users: [],
  searchFilter: "",
  filter: null,
};

const userReducer = createReducer(initialState, {
  FILTER_USER: (state, action: PayloadAction<any>) => {
    state.filter = action.payload;
  },
  ADD_USER: (state, action: PayloadAction<User>) => {
    state.users.push(action.payload);
  },
  LOGIN_USER: (state, action: PayloadAction<UserLogined>) => {
    state.userLogined = action.payload;
  },
  LOGOUT_USER: (state) => {
    if (state.userLogined) {
      // const updatedUser = state.users.map((user) => {
      //   if (user.email === state.userLogined!.email) {
      //     return {
      //       ...user,
      //       cart: state.userLogined!.cart,
      //       email: state.userLogined!.email,
      //       name: state.userLogined!.name,
      //       bday: state.userLogined!.bday,
      //       status: state.userLogined!.status,
      //       add_address: state.userLogined!.add_address,
      //       phone: state.userLogined!.phone,
      //       img: state.userLogined!.img,
      //     };
      //   }

      //   return user;
      // });
      // lưu lại cart khi đăng xuất
      state.userLogined = null;
      // state.users = updatedUser;
    }
  },
  ADD_TO_CART: (state, action: PayloadAction<CartItem>) => {
    if (state.userLogined) {
      let flag = false;

      const updatedATC = state.userLogined.cart.map((product) => {
        if (product.product_id === action.payload.product_id) {
          flag = true;
          return {
            ...product,
            quantity: product.quantity + action.payload.quantity,
          };
        }

        return product;
      });

      const updatedCartUser = state.users.map((user) => {
        if (user.email === state.userLogined!.email) {
          return {
            ...user,
            cart: updatedATC,
          };
        }

        return user;
      });

      if (!flag) {
        updatedATC.push(action.payload);
      }

      state.userLogined.cart = updatedATC;
      state.users = updatedCartUser;
    }
  },
  DELETE_FROM_CART: (state, action: PayloadAction<number>) => {
    if (state.userLogined) {
      const updatedATC = state.userLogined.cart.filter(
        (item) => item.product_id !== action.payload
      );

      state.userLogined.cart = updatedATC;
    }
  },
  CHANGE_QUANTITY: (
    state,
    action: PayloadAction<{ id: number; quantity: number }>
  ) => {
    if (state.userLogined) {
      const updatedATC = state.userLogined.cart.map((product) => {
        if (product.product_id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }

        return product;
      });

      state.userLogined.cart = updatedATC;
    }
  },
  CLEAR_CART: (state) => {
    if (state.userLogined) {
      state.userLogined.cart = [];
    }
  },
  UPDATE_INFO: (
    state,
    action: PayloadAction<{ email: string; img: string }>
  ) => {
    let img = action.payload.img;
    if (img == "") {
      img =
        "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif";
    }
    if (state.userLogined) {
      state.userLogined.email = action.payload.email;
      state.userLogined.img = img;
    }
  },
  UPDATE_STATUS_USER: (state, action: PayloadAction<User>) => {
    const updatedUsers = state.users.map((user) => {
      if (user.email === action.payload.email) {
        return action.payload;
      }
      return user;
    });
    state.users = updatedUsers;
  },
  SEARCH_USER: (state, action: PayloadAction<string>) => {
    state.searchFilter = action.payload;
  },
  CHANGE_PASSWORD_USER: (
    state,
    action: PayloadAction<{ email: string; password: string }>
  ) => {
    const updatedPassUsers = state.users.map((user) => {
      if (user.email === action.payload.email) {
        return { ...user, password: action.payload.password };
      } else {
        return user;
      }
    });

    state.users = updatedPassUsers;
  },
});

export default userReducer;
