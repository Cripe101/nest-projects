import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const InventoryLayout = () => {
  return (
    <div className="md:grid flex grid-cols-[1fr_6fr]">
      <Navbar />
      <section className="">
        <Outlet />
      </section>
    </div>
  );
};

export default InventoryLayout;
