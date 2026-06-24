import { useState } from "react";
import Input from "../components/custom/Input";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login({ username, password }),
    onSuccess: (data) => {
      const role = data.value.user.role;
      role === "admin"
        ? navigate("/inventory")
        : role === "manager"
          ? navigate("/inventory")
          : role === "cashier"
            ? navigate("/sale")
            : "";

      toast.success(`${username} successfully login`);
    },
    onError: (err) => {
      toast.error("Login failed: " + err.message);
    },
  });

  const handleSubmit = () => {
    const data = {
      username,
      password,
    };

    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <section className="bg-slate-50 px-10 py-2 rounded-lg">
        <h1 className="text-center my-2 font-medium">Login</h1>
        <section className="grid gap-3 mb-5">
          <Input
            label="username"
            placeholder="username"
            value={username}
            setter={setUsername}
          />
          <Input
            label="password"
            placeholder="password"
            type="password"
            value={password}
            setter={setPassword}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 py-2 rounded-xl text-white font-bold active:scale-95 duration-200"
          >
            Login
          </button>
        </section>
      </section>
    </div>
  );
};

export default Login;
