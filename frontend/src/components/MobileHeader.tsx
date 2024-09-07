import { GrSearch } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";
import { useTheme } from "../context/ThemContext";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { SetURLSearchParams } from "react-router-dom";

interface Inputs {
  jobTitle: string;
  jobType: string;
}

const MobileHeader = ({
  setSearchParams,
}: {
  setSearchParams: SetURLSearchParams;
}) => {
  const { isDark } = useTheme();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const omSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    setSearchParams({
      jobTitle: inputs.jobTitle,
      location: "",
      jobType: inputs.jobType,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(omSubmit)}
      className={clsx(
        "flex items-center justify-between  shadow-md p-2 mt-[-2rem]  rounded-md md:hidden sticky top-0 z-10",
        {
          "bg-black": isDark,
          "bg-white": !isDark,
        }
      )}
    >
      <input
        type="text"
        {...register("jobTitle", { required: "Fill the job title." })}
        className={clsx(
          "w-full h-full focus:outline-none outline-none pl-5 grow",
          {
            "bg-black placeholder:text-slate-500 text-stone-200": isDark,
          }
        )}
        placeholder="Filter by title..."
      />
      <div className="flex gap-4 px-5 py-2">
        <button type="button" onClick={toggleDropDown}>
          <FaFilter className="w-6 h-6 text-gray-500" />
        </button>
        <button className="bg-violet-500 text-white p-2 rounded-md">
          <GrSearch className="w-6 h-6" />
        </button>
      </div>
      {isDropDownOpen && (
        <div
          className={clsx(
            "flex flex-col absolute bottom-[-120%] right-0 px-10  rounded-b-md shadow-lg py-4",
            {
              "bg-white": !isDark,
              "bg-black text-white": isDark,
            }
          )}
        >
          <div className="flex gap-2">
            <input
              type="radio"
              id="fullTime"
              value="Full Time"
              {...register("jobType")}
            />
            <label htmlFor="fullTime">Full Time</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="partTime"
              value="Part Time"
              {...register("jobType")}
            />
            <label htmlFor="partTime">Part Time</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="internship"
              value="Internship"
              {...register("jobType")}
            />
            <label htmlFor="internship">Internship</label>
          </div>
        </div>
      )}
    </form>
  );
};

export default MobileHeader;
