import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function apiRequest<response = any>(
  method: string,
  url: string
): Promise<response> {
  try {
    const response = await api({
      method,
      url,
    });

    return response.data as response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}
