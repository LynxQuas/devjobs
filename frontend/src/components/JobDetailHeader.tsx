import clsx from "clsx";
import { useTheme } from "../context/ThemContext";

interface Props {
  companyName: string;
  website: string;
  logo: string;
}

const JobDetailHeader = ({ companyName, website, logo }: Props) => {
  const { isDark } = useTheme();
  return (
    <div
      className={clsx(
        "flex mt-[-2rem] w-full md:w-[70%] rounded-md shadow-md items-center overflow-clip",
        {
          "bg-slate-800 text-stone-400": isDark,
          "bg-white text-stone-400": !isDark,
        }
      )}
    >
      <img src={logo} className="w-24 object-cover h-24 md:w-32 md:h-32" />
      <div className="flex grow full justify-between items-center px-4 md:px-10">
        <div className="flex gap-1 flex-col">
          <h3
            className={clsx("text-2xl font-bold", {
              "text-stone-200": isDark,
            })}
          >
            {companyName}
          </h3>
          <p className="text-gray-400">{website}</p>
        </div>
        <button className="bg-violet-200 md:px-6 p-2 rounded-md md:py-3 text-violet-500 font-bold hidden md:block">
          Company Site
        </button>
      </div>
    </div>
  );
};

export default JobDetailHeader;
