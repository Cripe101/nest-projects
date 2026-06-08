import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const InventoryLayout = () => {
  return (
    <div>
      <div className="">
        <section>
          <Navbar />
        </section>
        <section className="">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default InventoryLayout;
