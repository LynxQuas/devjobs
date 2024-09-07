import { GrSearch } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { useTheme } from "../context/ThemContext";
import { FaPlus } from "react-icons/fa";
import clsx from "clsx";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

interface Inputs {
  search: string;
  location: string;
  jobType: string;
}

interface Props {
  setSearchParams: SetURLSearchParams;
}

const Header = ({ setSearchParams }: Props) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const addNewPostHandler = () => {
    navigate("/admin/create");
  };

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    setSearchParams({
      jobTitle: inputs.search,
      location: inputs.location,
      jobType: inputs.jobType,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "md:flex   hidden justify-center items-center rounded-md overflow-clip shadow-md mt-[-2rem]  sticky top-0 z-10",
        {
          "bg-white": !isDark,
          "bg-black": isDark,
        }
      )}
    >
      <div
        className={clsx("relative grow h-16 border-r-2", {
          "border-slate-700": isDark,
        })}
      >
        <input
          type="text"
          {...register("search", {
            required: "Fill the title",
          })}
          placeholder={
            errors?.search?.message
              ? (errors.search.message as string)
              : "Filter by title"
          }
          className={clsx("w-full h-full focus:outline-none pl-16", {
            "bg-black placeholder:text-slate-500 text-stone-200": isDark,
            "placeholder:text-red-500/50": errors?.search?.message,
            "placeholder:text-red-500/70": errors?.search?.message && isDark,
          })}
        />
        <GrSearch className="absolute text-violet-500 top-5 left-0 w-7 h-7 mx-6" />
      </div>

      <div
        className={clsx("relative grow h-16 border-r-2", {
          "border-slate-700": isDark,
        })}
      >
        <input
          type="text"
          {...register("location", { required: "Fill the location" })}
          placeholder={
            errors?.location?.message
              ? (errors.location.message as string)
              : "Filter by location..."
          }
          className={clsx("w-full h-full focus:outline-none pl-16", {
            "bg-black placeholder:text-slate-500 text-stone-200": isDark,
            "placeholder:text-red-500/50": errors?.location?.message,
            "placeholder:text-red-500/70": errors?.location?.message && isDark,
          })}
        />
        <IoLocationSharp className="absolute text-violet-500 top-5 left-0 w-7 h-7 mx-6" />
      </div>
      <div
        className={clsx(
          "w-1/3 shrink-0 h-16 flex items-center justify-around px-6 ",
          {
            "bg-black text-stone-400": isDark,
            "bg-white": !isDark,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <select
            {...register("jobType")}
            className={clsx("outline-none text-sm", {
              "bg-black text-white": isDark,
            })}
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
          </select>
        </div>
        <button className="bg-violet-500 rounded-md text-white px-5 py-3">
          Search
        </button>
        {isAuthenticated && (
          <button onClick={addNewPostHandler}>
            <FaPlus className="w-10 h-10" />
          </button>
        )}
      </div>
    </form>
  );
};

export default Header;
