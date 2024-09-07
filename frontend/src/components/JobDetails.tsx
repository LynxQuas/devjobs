import { GoDotFill } from "react-icons/go";
import { useTheme } from "../context/ThemContext";
import Markdown from "react-markdown";
import clsx from "clsx";
import { formatDate } from "../utils/helper";

interface Props {
  createAt: string;
  jobType: string;
  jobTitle: string;
  website: string;
  description: string;
  location: string;
}

const JobDetails = ({
  createAt,
  jobType,
  jobTitle,
  website,
  description,
  location,
}: Props) => {
  const { isDark } = useTheme();

  return (
    <div
      className={clsx(
        " rounded-md p-10 shadow-md w-full md:w-[70%] flex flex-col gap-10",
        {
          "bg-slate-800 text-stone-200": isDark,
          "bg-white text-stone-500": !isDark,
        }
      )}
    >
      <div className="flex flex-col gap-3">
        <p className="flex  items-center gap-3">
          {formatDate(createAt)} <GoDotFill /> {jobType}
        </p>
        <div className="flex justify-between items-center">
          <h2
            className={clsx("text-xl md:text-2xl font-bold", {
              "text-stone-300": isDark,
            })}
          >
            {jobTitle}
          </h2>
          <a
            target="_blank"
            href={website}
            rel="noopener norefererrer"
            className="hidden md:block text-center bg-violet-500 text-white w-[10rem] py-4 rounded-md"
          >
            Apply Now
          </a>
        </div>
        <p className="text-violet-500 font-semibold">{location}</p>
        <a
          target="_blank"
          href={website}
          rel="noopener norefererrer"
          className="md:hidden text-center bg-violet-500 text-white w-[10rem] py-2 rounded-md"
        >
          Apply Now
        </a>
      </div>

      <Markdown>{description}</Markdown>
    </div>
  );
};

export default JobDetails;
