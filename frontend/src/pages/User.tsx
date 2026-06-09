import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/UserApi";
import type { IUserGet } from "../interfaces/IUser";

const User = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <div className="p-5">
      <h1>User</h1>
      <section className="p-5 grid grid-cols-6 gap-5">
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
  );
};

export default User;
