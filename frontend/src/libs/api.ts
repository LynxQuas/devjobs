import { Job } from "../type";
const API = import.meta.env.VITE_API;

export const createJob = async (data: Job) => {
  const res = await fetch(`${API}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Failed to create a new job.Please try again.");
};

export const getAllJobs = async (queryString: string = "", limit: number) => {
  console.log(queryString);
  const res = await fetch(`${API}/jobs?limit=${limit}&${queryString}`);
  if (res.ok) {
    return res.json();
  }

  throw new Error("Failed to get list of jobs.PLease try again.");
};

export const getJobDetails = async (id: string | undefined) => {
  const res = await fetch(`${API}/jobs/${id}`);
  if (res.ok) {
    return res.json();
  }

  throw new Error("Failed to get the job details.");
};

export const deleteJob = async (id: string) => {
  console.log(id);
  const res = await fetch(`${API}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Add headers if required
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Could not delete the job.");
};

export const updateJob = async (id: string | undefined, data: Job) => {
  console.log(id);
  const res = await fetch(`${API}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Add headers if required
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Could not delete the job.");
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add headers if required
    },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Could not delete the job.");
};
