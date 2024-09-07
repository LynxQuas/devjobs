import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import MobileHeader from "../components/MobileHeader";
import { getAllJobs } from "../libs/api";
import { Job } from "../type";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const [limit, setLimit] = useState<number>(9);

  const { data, isLoading, isError, error } = useQuery<{
    jobs: Job[];
    pageCount: number;
  }>({
    queryKey: ["jobs", queryString, limit],
    queryFn: () => getAllJobs(queryString || "", limit),
  });

  const jobs = data?.jobs || [];
  const pageCount = data?.pageCount || 0;

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log("pageCoubt", pageCount);
  console.log("limit", limit);

  return (
    <section className="">
      <Header setSearchParams={setSearchParams} />
      <MobileHeader setSearchParams={setSearchParams} />

      {jobs?.length > 0 ? (
        <>
          <div className="flex my-24 gap-8 flex-wrap justify-center">
            {jobs!.map((job) => (
              <JobCard key={job._id} data={job} />
            ))}
          </div>
          <div className="flex justify-center items-center mb-10">
            {limit < pageCount && (
              <button
                onClick={() => setLimit((prev) => prev + 3)}
                className="bg-violet-500 text-white px-6 py-4 rounded-md"
              >
                Load More
              </button>
            )}
          </div>
        </>
      ) : (
        <h3 className="text-center my-20 text-yellow-700">
          No jobs found. Please try again.
        </h3>
      )}
    </section>
  );
};

export default Home;
