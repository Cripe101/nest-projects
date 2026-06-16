import { useLocation, useNavigate } from "react-router-dom";
import { navData } from "../data/navData";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="h-screen flex flex-col gap-5 shadow-sm relative">
      <section
        className="md:hidden absolute top-5 left-90"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose size={30} /> : <CiMenuBurger size={30} />}
      </section>
      <section className="hidden fixed z-2 bg-white py-5 md:flex flex-col justify-between h-full font-bold font-sans">
        <section className="grid gap-3">
          <section className="block text-xl md:text-2xl font-serif font-bold text-blue-700 shadow px-6 py-2.5">
            Profit Tracker
          </section>
          <section className="flex flex-col gap-1 px-2">
            {navData.map((nav, index) => (
              <button
                type="button"
                onClick={() => navigate(nav?.path)}
                key={index}
                className={`${nav?.label === "Phone" ? "gap-.5" : "gap-1"} ${pathname === nav.path ? "bg-blue-700 text-white" : "hover:bg-blue-100"} flex px-2 py-1.5 items-center cursor-pointer  rounded-xl duration-200`}
              >
                <nav.icon size={26} />
                <p>{nav?.label}</p>
              </button>
            ))}
          </section>
        </section>
        <section className="flex items-center justify-center px-2">
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="w-full py-1 bg-red-600 text-white rounded-xl cursor-pointer active:scale-90 duration-200"
          >
            Logout
          </button>
        </section>
      </section>
      <section
        className={`${isOpen ? "flex flex-col" : "hidden"} z-1 top-15 -right-100 py-3 px-5 bg-blue-100 absolute justify-center gap-3 text-base font-bold font-sans rounded-xl`}
      >
        {navData.map((nav, index) => (
          <button
            type="button"
            onClick={() => {
              navigate(nav?.path);
            }}
            key={index}
            className={`${nav?.label === "Phone" ? "gap-.5" : "gap-1"} ${pathname === nav?.path ? "text-blue-600" : ""} flex items-center cursor-pointer duration-200`}
          >
            <nav.icon size={20} />
            <p>{nav?.label}</p>
          </button>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="flex  gap-1 font-bold px-3 py-1 bg-red-600 text-white rounded-xl cursor-pointer active:scale-90 duration-200"
        >
          <CiLogout size={20} />
          Logout
        </button>
      </section>
    </div>
  );
};

export default Navbar;
