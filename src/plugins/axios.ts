import axios from "axios";

axios.defaults.baseURL = "https://club.metsenat.uz/api/v1/";

export default axios;

////////////////////////////////////
// import axios, { AxiosRequestConfig } from "axios";

// export const _BASE_CONFIG: AxiosRequestConfig = {
//   baseURL: "https://club.metsenat.uz/api/v1/",
//   headers: {
//     "Content-Type": "application / json",
//   },
// };

// export const authProtectedApi: any = () =>
//   axios.create({
//     ..._BASE_CONFIG,
//     headers: {
//       ..._BASE_CONFIG.headers,
//       Authorization: `Bearer ${localStorage.getItem("access")}`,
//     },
//   });

// export const publicApi = axios.create({ ..._BASE_CONFIG });

// export async function fetchData(url: string) {
//   const request = await publicApi.get(url);
//   try {
//     if (request.status === 200) {
//       return request;
//     }
//   } catch (error) {
//     return error;
//   }
// }
