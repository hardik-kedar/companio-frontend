
const API_URL = "https://api.trycompanio.in";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  return response;
};