import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/UserApi";
import type { IUserGet } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <div className="">
      <section className="p-5.5 shadow">
        <h1 className="text-xl font-bold">Sales</h1>
      </section>
      <div className="p-5">
        <section className="flex justify-between px-5">
          <h1>User</h1>
          <button
            onClick={() => navigate("/add-user")}
            className="bg-blue-600 px-3 py-1 rounded-xl text-white font-bold cursor-pointer active:scale-90 duration-200"
          >
            Add User
          </button>
        </section>
        <section className="p-5 grid grid-cols-2 md:grid-cols-6 gap-5">
          {data?.map((user: IUserGet) => (
            <span
              key={user._id}
              className="bg-blue-50 p-2 shadow flex justify-between rounded-xl px-3"
            >
              <h1>{user.username}</h1>
              <h1>{user.role}</h1>
            </span>
          ))}
        </section>
      </div>
    </div>
  );
};

export default User;
