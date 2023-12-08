import api, { getHeaders } from "./api";

interface AuthResponse {
  [key: string]: any;
}

interface ErrorResponse {
  [key: string]: any;
}

const login = async (
  email: string,
  password: string,
  type: string
): Promise<AuthResponse | ErrorResponse> => {
  const requestBody = {
    email,
    password,
    type,
  };

  try {
    const response = await api.post("/login", requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAuth = async (): Promise<AuthResponse | ErrorResponse> => {
  console.log("getHeaders()", getHeaders());
  try {
    const response = await api.get("/auth", { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logout = async (): Promise<AuthResponse | ErrorResponse> => {
  try {
    const response = await api.post("/logout", {}, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const register = async (
  requestBody: Record<string, any>
): Promise<AuthResponse | ErrorResponse> => {
  try {
    const response = await api.post("/users", requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  login,
  getAuth,
  logout,
  register,
};
