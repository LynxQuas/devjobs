import clsx from "clsx";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../context/ThemContext";
import { useNavigate } from "react-router-dom";
import { Job } from "../type";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

import { formatDate } from "../utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../libs/api";
import { useAuth } from "../context/AuthContext";

interface Props {
  data: Job;
}

const JobCard = ({ data }: Props) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const queryClient = useQueryClient();
  const { mutate: deleteJobMutation } = useMutation({
    mutationFn: deleteJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      console.log(data);
    },
    onError: (data) => {
      console.log(data.message);
    },
  });

  const onDeleteJob = (id: string) => {
    deleteJobMutation(id);
  };

  return (
    <div
      onClick={() => navigate(data._id)}
      className={clsx(
        "relative cursor-pointer w-[350px] shadow-md rounded-md flex flex-col py-16 px-8 md:px-12  gap-2 my-4 text-stone-400",
        {
          "bg-black text-slate-400": isDark,
          "bg-white text-slate-400": !isDark,
        }
      )}
    >
      <img
        src={data.logo}
        className="w-14 h-14 object-cover bg-gray-500 absolute top-[-30px] rounded-md"
      />
      {isAuthenticated && (
        <div className="absolute top-0 right-0 m-2 flex items-center">
          <button
            className="text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteJob(data._id);
            }}
          >
            <MdDelete className="w-7 h-7" />
          </button>
          <button
            className="text-violet-500"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${data._id}/edit`);
            }}
          >
            <MdModeEditOutline className="w-7 h-7" />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-3 ">
        <p className="flex items-center gap-2">
          {formatDate(data.createdAt)} <GoDotFill /> {data.jobType}
        </p>
        <h3
          className={clsx("text-xl font-bold ", {
            " text-stone-200": isDark,
            " text-black": !isDark,
          })}
        >
          {data.jobTitle.length > 24
            ? `${data.jobTitle.slice(0, 20)}...`
            : data.jobTitle}
        </h3>
        <p>{data.companyName}</p>
      </div>
      <p className="text-violet-500 font-semibold">{data.location}</p>
    </div>
  );
};

export default JobCard;
