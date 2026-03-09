
// const API_URL = "https://companio-backend-production.up.railway.app";
//   console.log("API_URL:", API_URL);

// export const apiFetch = async (
//   endpoint: string,
//   options: RequestInit = {}
// ) => {

//   const url = `${API_URL}${endpoint}`;

//   const response = await fetch(url, {
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {})
//     },
//     ...options
//   });

//   return response;
// };
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://companio-backend-production.up.railway.app";

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