import { useQuery } from "@tanstack/react-query";
import ApplySection from "../components/ApplySection";
import JobDetailHeader from "../components/JobDetailHeader";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router-dom";
import { getJobDetails } from "../libs/api";
import { Job } from "../type";

const JobDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery<Job>({
    queryKey: ["jobDetail", id],
    queryFn: () => getJobDetails(id!),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-10">
      <JobDetailHeader
        companyName={data!.companyName!}
        website={data!.website}
        logo={data!.logo}
      />
      <JobDetails
        jobTitle={data!.jobTitle}
        website={data!.website}
        description={data!.description}
        jobType={data!.jobType}
        location={data!.location}
        createAt={data!.createdAt}
      />

      {data!.description.length > 1000 && (
        <ApplySection
          jobTitle={data!.jobTitle}
          website={data!.website}
          companyName={data!.companyName!}
        />
      )}
    </section>
  );
};

export default JobDetailsPage;
