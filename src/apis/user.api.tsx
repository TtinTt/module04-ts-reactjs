import { User } from "../types-unEdit/User";
import api, { getHeaders } from "./api";

interface UserResponse {
  [key: string]: any;
}

interface ErrorResponse {
  [key: string]: any;
}

const searchUsers = async (
  params: Record<string, any> = {}
): Promise<UserResponse> => {
  try {
    const response = await api.get("/users", {
      params: params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const resetPass = async (
  email: string,
  codeResetPass: string,
  confirmPassword: string
): Promise<UserResponse | ErrorResponse> => {
  try {
    const response = await api.put("/users/resetpass", {
      email,
      code: codeResetPass,
      password: confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sendCodeResetPass = async (
  email: string
): Promise<UserResponse | ErrorResponse> => {
  try {
    const response = await api.put("/users/getcode", { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sentVerificationEmail = async (
  email: string
): Promise<UserResponse | ErrorResponse> => {
  try {
    const response = await api.put(
      "/users/verify-email",
      { email },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sentVerificationToken = async (
  token: string
): Promise<UserResponse | ErrorResponse> => {
  try {
    const response = await api.put("/users/verify-token", { token });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//NestJs
const updateUser = async (
  userId: number,
  requestBody: User | FormData | object
): Promise<UserResponse | ErrorResponse> => {
  try {
    const response = await api.put(`/users/${userId}`, requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error", error);
    return error;
  }
};

//NestJs
const register = async (
  requestBody: Record<string, any>
): Promise<UserResponse | ErrorResponse> => {
  try {
    const response = await api.post("/users", requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  searchUsers,
  updateUser,
  sendCodeResetPass,
  resetPass,
  register,
  sentVerificationEmail,
  sentVerificationToken,
};
