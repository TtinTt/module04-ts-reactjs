import api, { getHeaders } from "./api";

interface MessResponse {
  [key: string]: any;
}
interface ErrorResponse {
  [key: string]: any;
}

const searchMesss = async (
  params: Record<string, any> = {}
): Promise<MessResponse | ErrorResponse> => {
  try {
    const response = await api.get("/messs", { params, headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const createMess = async (
  requestBody: Record<string, any>
): Promise<void | ErrorResponse> => {
  try {
    const response = await api.post("/messs", requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const updateMess = async (
  messId: number,
  requestBody: Record<string, any>
): Promise<void | ErrorResponse> => {
  try {
    console.log("requestBody mess", requestBody);
    const response = await api.put(`/messs/${messId}`, requestBody, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

export default {
  searchMesss,
  createMess,
  updateMess,
};
