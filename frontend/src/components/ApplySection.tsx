import clsx from "clsx";
import { useTheme } from "../context/ThemContext";

interface Props {
  companyName: string;
  jobTitle: string;
  website: string;
}

const ApplySection = ({ companyName, jobTitle, website }: Props) => {
  const { isDark } = useTheme();
  return (
    <div
      className={clsx(
        "w-[100%]  flex justify-center py-10 rounded-md shadow-md",
        {
          "bg-slate-800 text-stone-200": isDark,
          "bg-white text-stone-500": !isDark,
        }
      )}
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center md:w-[70%] px-4 gap-4">
        <div className="flex flex-col gap-2 grow">
          <h3 className="text-2xl grow font-bold">{jobTitle}</h3>
          <p>{companyName}</p>
        </div>
        <a
          target="_blank"
          href={website}
          rel="noopener norefererrer"
          className="text-center bg-violet-500 text-white w-[10rem] py-4 rounded-md"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default ApplySection;
