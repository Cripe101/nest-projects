import { useState } from "react";
import Input from "../custom/Input";
import { useMutation } from "@tanstack/react-query";
import type { IUserPost } from "../../interfaces/IUser";
import { createUser } from "../../api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const addMutation = useMutation({
    mutationKey: ["add-user"],
    mutationFn: (data: IUserPost) => createUser(data),
    onSuccess: () => {
      toast.success("User added successfully");
      navigate("/user");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    const data: IUserPost = {
      username: username,
      password: password,
      role: userRole,
    };

    if (password != confirmPassword) {
      return toast.error("Password does not match");
    }

    username === ""
      ? toast.error("Enter username")
      : password === ""
        ? toast.error("Enter password")
        : userRole === ""
          ? toast.error("Select role")
          : confirmPassword === ""
            ? toast.error("Renter Password")
            : addMutation.mutate(data);
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center gap-3">
      <h1>AddUser</h1>
      <section className="grid gap-3">
        <Input
          label="Username"
          placeholder="Username"
          value={username}
          setter={setUsername}
        />
        <span className="grid">
          <label className="pl-2 text-sm font-medium">Role: </label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="bg-white px-3 py-2 shadow rounded-xl outline-none text-slate-500"
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
            <option value="staff">Staff</option>
          </select>
        </span>
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          setter={setPassword}
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          setter={setConfirmPassword}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-3 py-1 font-bold rounded-xl shadow cursor-pointer active:scale-90 duration-200"
        >
          Submit
        </button>
      </section>
    </div>
  );
};

export default AddUser;
