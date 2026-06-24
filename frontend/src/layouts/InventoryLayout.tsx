import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { navData } from "../data/navData";

const InventoryLayout = () => {
  return (
    <div className="md:grid flex grid-cols-[1fr_6fr]">
      <section className="hidden md:block w-64"></section>
      <Navbar navbarData={navData} />
      <section className="mb-20 md:mb-0">
        <Outlet />
      </section>
    </div>
  );
};

export default InventoryLayout;
