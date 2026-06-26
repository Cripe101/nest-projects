// components/Sidebar.tsx

import { CiLogout } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function Navbar({ navbarData }: { navbarData: NavbarItem[] }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 shadow bg-slate-50 flex-col justify-between">
        <nav className="flex flex-col gap-2 px-4">
          <div className="p-6 text-xl font-bold mb-5">Inventory System</div>
          {navbarData.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 transition-colors
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="flex gap-3 items-center justify-center bg-red-600 px-3 py-2 m-4 rounded-xl font-bold text-white cursor-pointer active:scale-90 duration-200"
        >
          <p>
            <CiLogout size={22} />
          </p>
          <p>Logout</p>
        </button>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 mx-2 mb-2 shadow shadow-green-200 rounded-xl bg-slate-50 md:hidden">
        <div className="flex justify-around">
          {navbarData.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center py-3 text-xs
                  ${isActive ? "text-blue-600" : "text-gray-500"}
                `}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="flex flex-col items-center py-3 text-xs text-red-600 cursor-pointer duration-200"
          >
            <p>
              <CiLogout size={22} />
            </p>
            <p>Logout</p>
          </button>
        </div>
      </nav>
    </>
  );
}
