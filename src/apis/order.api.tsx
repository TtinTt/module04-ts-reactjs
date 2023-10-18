import { Axios, AxiosError } from "axios";
import { Order } from "../types-unEdit/Order";
import api, { getHeaders } from "./api";

interface OrderResponse {
  [key: string]: any;
}
interface ErrorResponse {
  [key: string]: any;
}

const searchOrders = async (
  params: Record<string, any> = {}
): Promise<OrderResponse | ErrorResponse> => {
  try {
    const response = await api.get("/orders", {
      params: params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const createOrder = async (
  requestBody: Record<string, any>
): Promise<void | ErrorResponse> => {
  try {
    const response = await api.post("/orders", requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const getOrderByUserEmail = async (userEmail: string): Promise<Order[]> => {
  const email = encodeURIComponent(userEmail);
  try {
    const response = await api.get(`/orders/${email}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error", error);
    throw error;
  }
};

const updateOrder = async (
  orderId: number,
  requestBody: Record<string, any>
): Promise<void | ErrorResponse> => {
  try {
    const response = await api.put(`/orders/${orderId}`, requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

export default {
  searchOrders,
  createOrder,
  getOrderByUserEmail,
  updateOrder,
};
