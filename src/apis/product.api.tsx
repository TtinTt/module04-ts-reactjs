import api, { getHeaders } from "./api";

interface ProductResponse {
  [key: string]: any;
}

interface ErrorResponse {
  [key: string]: any;
}

const searchProducts = async (
  params: Record<string, any> = {}
): Promise<ProductResponse | ErrorResponse> => {
  try {
    const response = await api.get("/products", { params: params });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const createProduct = async (
  requestBody: FormData
): Promise<void | ErrorResponse> => {
  const originalHeaders = getHeaders();
  try {
    const response = await api.post("/products", requestBody, {
      headers: {
        ...originalHeaders,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const updateProduct = async (
  productId: number,
  requestBody: FormData
): Promise<void | ErrorResponse> => {
  const originalHeaders = getHeaders();
  try {
    const response = await api.put(`/products/${productId}`, requestBody, {
      headers: {
        ...originalHeaders,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const deleteProduct = async (
  productId: number
): Promise<void | ErrorResponse> => {
  try {
    const response = await api.delete(`/products/${productId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const getPrice = async (
  params: Record<string, any> = {}
): Promise<ProductResponse | ErrorResponse> => {
  try {
    const response = await api.get("/products/price", { params: params });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const getTag = async (
  params: Record<string, any> = {}
): Promise<ProductResponse | ErrorResponse> => {
  try {
    const response = await api.get("/products/tag", { params: params });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

export default {
  getPrice,
  getTag,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
