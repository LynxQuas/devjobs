import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { login as loginFetch } from "../libs/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Inputs {
  username: string;
  password: string;
}

const Admin = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate: loginMutation } = useMutation({
    mutationFn: loginFetch,
    onSuccess: () => {
      login();
      navigate("/admin/create");
    },
    onError: () => {
      alert("Sorry you are not allowed.");
    },
  });

  const onLogin: SubmitHandler<Inputs> = (data) => {
    loginMutation(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex justify-center items-center h-[30rem]"
      >
        <div className="flex flex-col gap-5 w-full md:w-[30rem] rounded-md">
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="p-4 w-full outline-none rounded-md"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            name="password"
            className="p-4 w-full outline-none rounded-md"
          />
          <button className="bg-violet-500 font-bold shadow-sm text-white p-4 rounded-md">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
