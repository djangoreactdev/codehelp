// ** React Imports
import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";
import { SidebarMini } from "../components/SidebarMini";
import { NavBar } from "../components/NavBar";

import { useStateContext } from "../contexts/ContextProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const BlankLayout = () => {
  const { menuState, NavbarState } = useStateContext();
  return (
    <div className="flex justify-center items-start h-screen p-1 bg-orange-50">
      <>
        <SidebarMini key={"SidebarMini"} />
        {menuState && <Sidebar key={"_sidebar"} />}
      </>

      <div className="w-full h-full">
        {NavbarState && (
          <NavBar
            class={
              "flex items-center justify-center space-x-4 px-4 mx-auto bg-blue-200 border-b rounded-lg mb-1 min-h-[55px]" ||
              ""
            }
          />
        )}
        <div className="h-[calc(100%-60px)] overflow-y-scroll no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
    // <>
    //   <Header />
    //   <main className="py-6">
    //     <Outlet />
    //     <ToastContainer theme="dark" />
    //   </main>
    //   <Footer />
    // </>
  );
};

export default BlankLayout;
