// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import axios from "axios";
import Router from "./router/Router";
import { getCookie } from "typescript-cookie";

if (process.env.REACT_APP_BASE_API === undefined) {
  axios.defaults.baseURL = "/api/v1";
} else {
  axios.defaults.baseURL = `${process.env.REACT_APP_BASE_API}/api/v1`;
}

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Router />
    </>
  );
};

export default App;
