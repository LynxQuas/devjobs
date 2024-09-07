import { SubmitHandler, useForm } from "react-hook-form";
import { useTheme } from "../context/ThemContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createJob, getJobDetails, updateJob } from "../libs/api";
import { Job } from "../type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import clsx from "clsx";

const PostJob = ({ id }: { id?: string | undefined }) => {
  const { isDark } = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // get the job data if editing.
  const { data: job } = useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () => getJobDetails(id),
    enabled: !!id,
  });

  const { mutate: updateJobMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: Job) => updateJob(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs", "jobDetails"],
      });
      navigate(`/${data.updatedJob._id}`);
    },
    onError: () => {
      console.log("error");
    },
  });

  // create job
  const { mutate: createNewJobMutation, isPending: isCreating } = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      navigate(`/${data.job._id}`);

      console.log(data);
    },
    onError: (data) => {
      console.log(data.message);
    },
  });

  const { register, handleSubmit, reset } = useForm<Job>();

  const onSubmit: SubmitHandler<Job> = (data) => {
    if (!id) {
      createNewJobMutation(data);
    } else {
      updateJobMutation(data);
    }
  };

  // form values are filled only after job is fetched.
  useEffect(() => {
    if (job) {
      reset({
        companyName: job.companyName || "",
        jobTitle: job.jobTitle || "",
        description: job.description || "",
        location: job.location || "",
        jobType: job.jobType || "",
        logo: job.logo || "",
        website: job.website || "",
      });
    }
  }, [job, reset]);

  return (
    <div className={`min-h-screen flex items-center justify-center md:p-6 `}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`shadow-lg rounded-lg p-8 w-full max-w-lg ${
          isDark
            ? "bg-gray-900 text-gray-200 border border-gray-700"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            isDark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Post a Job
        </h2>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            {...register("companyName", {
              required: "Company name is required.",
            })}
            placeholder="Company Name"
            name="companyName"
            className={`p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          />

          <input
            type="text"
            placeholder="Job Title"
            {...register("jobTitle", {
              required: "Company name is required.",
            })}
            name="jobTitle"
            className={`p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          />

          <textarea
            placeholder="Job Description"
            {...register("description", {
              required: "Company name is required.",
            })}
            name="description"
            className={`p-3 w-full h-32 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          ></textarea>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Location"
              {...register("location", {
                required: "Company name is required.",
              })}
              name="location"
              className={`p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isDark
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }`}
            />
            <select
              {...register("jobType", {
                required: "Company name is required.",
              })}
              name="jobType"
              className={`p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isDark
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }`}
            >
              <option>Part Time</option>
              <option>Internship</option>
              <option>Full Time</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Company Logo URL"
            {...register("logo", { required: "Company name is required." })}
            name="logo"
            className={`p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          />

          <input
            type="text"
            {...register("website", { required: "Company name is required." })}
            placeholder="Company Website URL"
            name="website"
            className={`p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          />

          {!id ? (
            <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 rounded-md shadow-lg transition duration-300">
              {isCreating ? "Posting..." : "Post Job"}
            </button>
          ) : (
            <div className="flex gap-10 w-full items-center">
              <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 rounded-md shadow-lg transition duration-300 px-5">
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className={clsx(
                  "font-bold py-3 rounded-md  transition duration-3000",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                  }
                )}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostJob;
