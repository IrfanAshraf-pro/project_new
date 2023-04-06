// chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
import axios from "axios";
const baseDomain = "http://localhost/HouseOfTutors_API/Api/";
const baseURL = `${baseDomain}`;

// const getToken = () => {
//   let ls = JSON.parse(localStorage.getItem("authUser"));
//   if (ls && ls.token != null) {
//     return `Bearer ${ls.token}`;
//   } else {
//     return "";
//   }
// };

let axiosObj;
axiosObj = axios.create({
  baseURL,
  // headers: "",
});
export default axiosObj;
