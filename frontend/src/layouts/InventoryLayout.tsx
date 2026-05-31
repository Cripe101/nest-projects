import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const InventoryLayout = () => {
  return (
    <div>
      <div className="grid grid-cols-[1fr_6fr]">
        <SideBar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InventoryLayout;
