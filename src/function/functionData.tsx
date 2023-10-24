import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userAction";
import { loginAdmin } from "../actions/adminAction";
import productApi from "../apis/product.api";
import { Product } from "../types-unEdit/Product";
import { Order } from "../types-unEdit/Order";
import { User } from "../types-unEdit/User";
import { Mess } from "../types-unEdit/Mess";
import { State } from "../types-unEdit/StateReducer";
import React from "react";

// Define interface for Product
// interface Product {
//   price: number;
//   name: string;
//   tag: string[];
//   sku: string;
// }

// Define interface for Order
// interface Order {
//   status: string;
//   email: string;
//   address: {
//     name: string;
//     phoneNumber: string;
//   };
// }

// Define interface for User
// interface User {
//   email: string;
//   name: string;
//   phone: string;
//   status: boolean;
// }

// Define interface for Message
// interface Message {
//   email: string;
//   name: string;
//   phone: string;
//   status: boolean;
// }
// Continue from the previous snippet

// Define a type for the ORDER_STATUSES object
type OrderStatusesType = {
  [key: string]: {
    message: string;
    color: string;
  };
};

// Define the ORDER_STATUSES object
const ORDER_STATUSES: OrderStatusesType = {
  0: {
    message: "Đang xử lý thông tin đơn hàng",
    color: "#D7D7D7",
  },
  1: {
    message: "Đơn hàng đang được chuẩn bị",
    color: "PaleGoldenRod",
  },
  2: {
    message: "Đơn hàng đang được giao tới",
    color: "PaleGoldenRod",
  },
  3: {
    message: "Đơn hàng đã được giao thành công",
    color: "PaleGoldenRod",
  },
  4: {
    message: "Giao hàng không thành công và đang chuyển hoàn",
    color: "PaleGoldenRod",
  },
  5: {
    message: "Đơn hàng đã được chuyển hoàn",
    color: "#ffdab9",
  },
  "-1": {
    message: "Đơn hàng đã bị huỷ",
    color: "#ffdab9",
  },
  "-2": {
    message: "Đơn hàng bị từ chối",
    color: "#ffdab9",
  },
};

// Remove accents and convert to uppercase
export const removeAccentsUpperCase = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
};

// Fetch products
export const fetchProducts = async (
  keyword: string,
  page: number,
  NUMBER_RECORDS_PER_PAGE: number
): Promise<any> => {
  try {
    const data = await productApi.searchProducts({
      name: keyword,
      page: page,
      limit: NUMBER_RECORDS_PER_PAGE,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// More functions...
export const getStatus = (
  status: number | string | null | undefined
): string => {
  if (status === null || status === undefined)
    return "Trạng thái không xác định";

  const orderStatus = status?.toString();
  return ORDER_STATUSES[orderStatus]?.message || "Trạng thái không xác định";
};

export const isArrayContainingObjects = (obj: Object): boolean => {
  if (!Array.isArray(obj)) {
    return false;
  }

  for (let item of obj) {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      return false;
    }
  }

  return true;
};

// In the React components or hooks, you would use the defined interfaces/types to type the props, state, etc.
export const hanleGetColor = (
  status: string | null | undefined | number
): string => {
  if (status === null || status === undefined) return "none";

  const orderStatus = status?.toString();
  return ORDER_STATUSES[orderStatus]?.color || "none";
};

export const prependLocalhost = (str: string | null): string | null => {
  if (str) {
    if (!str.startsWith("https://") || str.startsWith("http://")) {
      return "http://localhost:8000/" + str;
    }
    return str;
  } else return str;
};

export const getCurrentTimeString = (): string => {
  const now = new Date();
  const date = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = ("0" + now.getMinutes()).slice(-2);

  return `${hours}:${minutes} ${date}/${month}/${year}`;
};

export const useClearLogined = (): ((type: string) => void) => {
  const dispatch = useDispatch();

  const clearLogined = (type: string) => {
    if (type === "user") {
      localStorage.removeItem("X-API-Key");
      dispatch(loginUser(null));
    } else if (type === "admin") {
      localStorage.removeItem("X-API-Key-Admin");
      dispatch(loginAdmin(null));
    } else if (type === "all") {
      localStorage.removeItem("X-API-Key");
      dispatch(loginUser(null));
      localStorage.removeItem("X-API-Key-Admin");
      dispatch(loginAdmin(null));
    }
  };

  return clearLogined;
};

export const getDaysDifference = (date: string | null): number | string => {
  if (!date) {
    return "";
  }

  let dateString = date?.toString();
  if (dateString == "") {
    return "";
  } else {
    const [time, date] = dateString.split(" ");
    const [hour, minute] = time.slice(0, -1).split(":");
    const [day, month, year] = date.split("/");

    const now = new Date();
    const dateObject = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hour, 10),
      parseInt(minute, 10)
    );

    const differenceInTime = now.getTime() - dateObject.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600);

    return Math.abs(Math.round(differenceInDays));
  }
};

export const TruncateString = (str: string, lenInput: number): string => {
  if (str.length > lenInput) {
    return str.substring(0, lenInput) + "...";
  } else {
    return str;
  }
};

export const TruncateName = (
  name: string | null,
  lenInput: number
): string | null => {
  if (name) {
    let fullName = name.split(" ");
    let Fname = fullName[fullName.length - 1];
    if (Fname.length > lenInput) {
      return Fname.substring(0, lenInput) + "...";
    } else {
      return Fname;
    }
  } else {
    return name;
  }
};

export const Changedot = (money: string | number): string | number => {
  money = money?.toString();
  // money = JSON.stringify(money);
  if (money.includes("." || "đ")) {
    return Number(
      money
        .replace(/\s+/g, "") //xoá space
        .replace(/\./g, "") //xoá .
        .replace(/đ/g, "") //xoá đ
    );
  } else {
    let moneyEdit = money
      .replace(/\s+/g, "") //xoá space
      .replace(/\./g, "") //xoá .
      .replace(/đ/g, ""); //xoá đ
    return moneyEdit?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  }
};

export const removeDot = (money: string): number => {
  money = money?.toString();

  return Number(
    money
      .replace(/\s+/g, "") //xoá space
      .replace(/\./g, "") //xoá .
      .replace(/đ/g, "") //xoá đ
  );
};

const sortPrice = (productList: Product[], sortOption: number): Product[] => {
  if (sortOption === 0) {
    // console.log(productList);

    return productList;
  } else if (sortOption === 2) {
    // console.log(productList);

    return productList.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption === 1) {
    // console.log(productList);

    return productList.slice().sort((a, b) => b.price - a.price);
  } else {
    // console.log(productList);

    return productList;
  }
};

const sortPriceFrom = (
  productList: Product[],
  priceMax: number | null
): Product[] => {
  // console.log("sortPriceFrom");

  if (priceMax === null) {
    return productList; // Trả về mảng gốc nếu price null
  }

  const sortedList = productList.filter((product) => product.price <= priceMax);

  return sortedList;
};

export const HandleFilter = async (
  currentPage: number,
  productsPerPage: number
): Promise<{ totalProductsDB: number; productList: Product[] }> => {
  console.log("HandleFilter");
  // lấy giá trị ô search
  const searchFilter =
    (await useSelector((state: State) => state.productReducer.searchFilter)) ??
    "";

  // lấy giá trị productListInput từ DB
  const products = await fetchProducts(
    searchFilter,
    currentPage,
    productsPerPage
  );

  const productListInput = products.records;
  const totalProductsDB = products.total;

  console.log("productListInput", productListInput);

  // lấy option sort từ store
  const sortOption =
    useSelector((state: State) => state.productReducer.sort) ?? 0;
  // lấy max price sort từ store
  const priceFromValue =
    useSelector((state: State) => state.productReducer.priceFrom) ?? null;

  // sắp xếp thứ tự tăng giảm
  let sortProductList = sortPrice(productListInput, sortOption);

  // sắp xếp chỉ hiển thị các sản phẩm có giá dưới priceFromValue
  let sortProductListFrom = sortPriceFrom(sortProductList, priceFromValue);

  // lấy listProducts lọc theo ô search
  let listSorted = sortProductListFrom.filter((product) =>
    removeAccentsUpperCase(product.name + product.tag + product.sku).includes(
      removeAccentsUpperCase(searchFilter).toUpperCase()
    )
  );
  console.log("listSorted", listSorted);
  return { totalProductsDB, productList: listSorted };
};

export const CheckLink = (): string => {
  const location = useLocation();

  React.useEffect(() => {
    console.log("đường dẫn '", location.pathname, "'"); // Logs link
  }, [location]);

  return location.pathname;
};

export const addSpace = (inputString: string): string => {
  let removeSpace = inputString?.toString().replace(/\s+/g, "");
  return removeSpace.replace(/,/g, ", ");
};

export const splitArray = (inputString: string): string[] => {
  let removeSpace = inputString.replace(/\s+/g, "");
  return removeSpace.split(",");
};

const FilterOrders = (orders: Order[], filterOption: number): Order[] => {
  let filteredOrders: Order[] = [];
  // console.log(orders);
  if (filterOption === 0) {
    filteredOrders = orders;
  } else if (filterOption === 1) {
    filteredOrders = orders.filter((order) =>
      ["0", "1", "2", "4"].includes(order.status?.toString())
    );
  } else if (filterOption === 2) {
    filteredOrders = orders.filter((order) =>
      ["-1", "-2", "3", "5"].includes(order.status?.toString())
    );
  }

  return filteredOrders;
};

export const HandleFilterOrder = (): Order[] => {
  // lấy giá trị ô orderList từ store
  const orderList = useSelector((state: State) => state.orderReducer.orders);

  // lấy option filter từ store
  const filterOption =
    useSelector((state: State) => state.orderReducer.filter) ?? 0;

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state: State) => state.orderReducer.searchFilter) ?? "";

  // lọc theo filter
  let filteredOrders = FilterOrders(orderList, filterOption);
  // console.log(filteredOrders);

  // lấy listorders lọc theo ô search
  let listSorted = filteredOrders.filter((order) =>
    removeAccentsUpperCase(
      getEmailName(order.email) + order.address.name + order.address.phoneNumber
    ).includes(removeAccentsUpperCase(searchFilter).toUpperCase())
  );
  // console.log(listSorted);
  return listSorted;
};

const getStatusUser = (status: boolean): string => {
  return status ? "Đang hoạt động" : "Đình chỉ";
};

export const HandleFilterUser = (): User[] => {
  // lấy giá trị ô userList từ store
  const userList = useSelector((state: State) => state.userReducer.users);

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state: State) => state.userReducer.searchFilter) ?? "";

  // lấy listUsers lọc theo ô search
  let listSorted = userList.filter((user) =>
    removeAccentsUpperCase(
      getEmailName(user.email) + user.name + user.phone
      // +
      // getStatusUser(user.status)
    ).includes(removeAccentsUpperCase(searchFilter).toUpperCase())
  );
  return listSorted;
};

const getEmailName = (email: string): string => {
  if (email.includes("@")) {
    const emailParts = email.split("@");
    const emailName = emailParts[0];
    return emailName;
  } else {
    return email;
  }
};

const getStatusMess = (status: number): string => {
  return status ? "Đã phản hồi" : "Chưa phản hồi";
};

export const HandleFilterMess = (): Mess[] => {
  // lấy giá trị ô messList từ store
  const messList = useSelector((state: State) => state.messReducer.messs);

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state: State) => state.messReducer.searchFilter) ?? "";

  // lấy listMesss lọc theo ô search
  let listSorted = messList.filter((mess) =>
    removeAccentsUpperCase(
      getEmailName(mess.email) +
        mess.name +
        mess.phone +
        getStatusMess(mess.status)
    ).includes(removeAccentsUpperCase(searchFilter).toUpperCase())
  );
  return listSorted;
};

export const useGetTagsProducts = (): string[] => {
  let products = useSelector((state: State) => state.productReducer.products);

  // lấy tag đầu tiên của mỗi sản phẩm
  const firstTags = products.map((product) =>
    product.tag[0].toLocaleLowerCase()
  );

  // bỏ các tag trùng lặp
  const listTag = firstTags.filter(
    (tag, index) => firstTags.indexOf(tag) === index
  );
  // console.log(listTag);
  return listTag;
};

export const useGetProductsByTags = (): { [key: string]: Product[] } => {
  const result: { [key: string]: Product[] } = {};

  let products = useSelector((state: State) => state.productReducer.products);
  let listCatalogueByTag = useGetTagsProducts();

  listCatalogueByTag.forEach((tag) => {
    // Lọc ra các sản phẩm có tag tương ứng
    const filteredProducts = products.filter((product) => {
      // Kiểm tra xem tag có tồn tại trong mảng tag của sản phẩm không
      let tagExists = product.tag.some(
        (productTag) =>
          productTag.toLocaleLowerCase() === tag.toLocaleLowerCase()
      );

      return tagExists;
    });

    result[tag] = filteredProducts;
  });

  return result;
};
