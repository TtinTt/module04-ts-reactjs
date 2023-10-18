import api, { getHeaders } from "./api";

interface AdminResponse {
  [key: string]: any;
}

interface ErrorResponse {
  [key: string]: any;
}

const searchAdmins = async (
  params: Record<string, any> = {}
): Promise<AdminResponse | ErrorResponse> => {
  try {
    const response = await api.get("/admins", {
      params: params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const updateAdmin = async (
  adminId: number,
  requestBody: Record<string, any>
): Promise<AdminResponse | ErrorResponse> => {
  try {
    const response = await api.put(`/admins/${adminId}`, requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const addAdmin = async (
  requestBody: Record<string, any>
): Promise<AdminResponse | ErrorResponse> => {
  try {
    const response = await api.post("/admins", requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

export default {
  searchAdmins,
  updateAdmin,
  addAdmin,
};
