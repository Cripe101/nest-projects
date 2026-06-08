import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
