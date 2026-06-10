import { useLocation, useNavigate } from "react-router-dom";
import { navData } from "../data/navData";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className="flex justify-between items-center p-5 shadow-sm relative">
      <section className="text-xl md:text-3xl font-serif font-medium text-blue-700">
        Profit Tracker
      </section>
      <section className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoMdClose size={30} /> : <CiMenuBurger size={30} />}
      </section>
      <section className="hidden md:flex justify-between gap-10 font-bold font-sans">
        <section className="flex gap-10">
          {navData.map((nav, index) => (
            <button
              type="button"
              onClick={() => navigate(nav?.path)}
              key={index}
              className={`${nav?.label === "Phone" ? "gap-.5" : "gap-1"} ${pathname === nav.path ? "text-blue-600 scale-110" : ""} flex items-center cursor-pointer duration-200`}
            >
              <nav.icon size={26} />
              <p>{nav?.label}</p>
            </button>
          ))}
        </section>
        <section className="flex justify-end">
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="px-3 py-1 bg-red-600 text-white rounded-xl cursor-pointer active:scale-90 duration-200"
          >
            Logout
          </button>
        </section>
      </section>
      <section
        className={`${isOpen ? "grid" : "hidden"} z-1 top-15 right-5 py-3 px-5 bg-blue-100 absolute justify-center gap-3 text-base font-bold font-sans rounded-xl`}
      >
        {navData.map((nav, index) => (
          <button
            type="button"
            onClick={() => {
              navigate(nav?.path);
              setIsOpen(!isOpen);
            }}
            key={index}
            className={`${nav?.label === "Phone" ? "gap-.5" : "gap-1"} ${pathname === nav?.path ? "text-[#2191FB] scale-110" : ""} text-lg flex items-center cursor-pointer duration-200`}
          >
            <nav.icon size={20} />
            <p>{nav?.label}</p>
          </button>
        ))}
        <section className="flex justify-end">
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
      </section>
    </div>
  );
};

export default Navbar;
