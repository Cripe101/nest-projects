import { useLocation, useNavigate } from "react-router-dom";
import { navData } from "../data/navData";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[2fr_3fr] justify-between items-center p-5 shadow-sm">
      <section className="md:text-3xl font-serif font-medium text-blue-700">
        Profit Tracker
      </section>
      <section className="hidden md:flex justify-center gap-10 font-bold font-sans">
        {navData.map((nav, index) => (
          <button
            type="button"
            onClick={() => navigate(nav?.path)}
            key={index}
            className={`${nav?.label === "Phone" ? "gap-.5" : "gap-1"} ${pathname === nav.path ? "text-blue-600 scale-105" : ""} flex items-center cursor-pointer duration-200`}
          >
            <nav.icon size={26} />
            <p>{nav?.label}</p>
          </button>
        ))}
      </section>
      <section className="md:hidden flex justify-center gap-3 text-sm font-bold font-sans">
        {navData.map((nav, index) => (
          <button
            type="button"
            onClick={() => navigate(nav?.path)}
            key={index}
            className={`${nav?.label === "Phone" ? "gap-.5" : "gap-1"} ${pathname === nav?.path ? "text-[#2191FB] scale-105" : ""} flex items-center cursor-pointer duration-200`}
          >
            <nav.icon size={20} />
            <p>{nav?.label}</p>
          </button>
        ))}
      </section>
    </div>
  );
};

export default Navbar;
