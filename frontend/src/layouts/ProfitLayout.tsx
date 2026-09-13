import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { profitNavData } from "../data/profitNavData";

const ProfitLayout = () => {
  return (
    <div className="md:grid grid-cols-[1fr_6fr]">
      <section className="hidden md:block w-64"></section>
      <Navbar navbarData={profitNavData} />
      <section className="mb-20 md:mb-0">
        <Outlet />
      </section>
    </div>
  );
};

export default ProfitLayout;
