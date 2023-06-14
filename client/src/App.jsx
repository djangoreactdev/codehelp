// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import axios from "axios";
import Router from "./router/Router";

if (process.env.REACT_APP_BASE_API === undefined) {
  axios.defaults.baseURL = "/api/v1";
} else {
  axios.defaults.baseURL = `${process.env.REACT_APP_BASE_API}/api/v1`;
}

const App = () => {
  return (
    <>
      <Router />
    </>
  );
};

export default App;
