import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
