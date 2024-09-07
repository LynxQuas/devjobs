const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  const { jobTitle, location, jobType, limit } = req.query;

  if (!jobTitle) {
    const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(limit);
    console.log(limit);
    const pageCount = await Job.countDocuments();
    return res.status(200).json({ jobs, pageCount });
  }

  // filter job.

  const jobs = await Job.find({
    jobTitle: { $regex: jobTitle, $options: "i" },
    location: { $regex: location, $options: "i" },
    jobType: { $regex: jobType, $options: "i" },
  });
  const pageCount = jobs.length;
  return res.status(200).json({ jobs, pageCount });
};

const createJob = async (req, res) => {
  console.log(req.body);
  const {
    jobTitle,
    companyName,
    description,
    logo,
    location,
    jobType,
    website,
  } = req.body;

  if (
    !jobTitle ||
    !companyName ||
    !description ||
    !logo ||
    !location ||
    !jobType ||
    !website
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all the provided inputs." });
  }

  const newJobData = {
    jobTitle,
    companyName,
    description,
    logo,
    location,
    jobType,
    website,
  };

  try {
    const newJob = new Job(newJobData);
    await newJob.save();
    return res.status(201).json({ job: newJob });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const getJobDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required." });
  }

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json(job);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  1;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    await Job.findByIdAndDelete(id);
    return res.status(200).json({ message: "Job deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id must be filled." });
  }

  const {
    companyName,
    jobTitle,
    description,
    location,
    jobType,
    logo,
    website,
  } = req.body;
  if (
    !companyName ||
    !jobTitle ||
    !description ||
    !location ||
    !jobType ||
    !logo ||
    !website
  ) {
    return res.status(400).json({ message: "Form inputs must be filled." });
  }

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "job not found." });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        companyName,
        jobTitle,
        description,
        location,
        jobType,
        logo,
        website,
      },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ message: "Job updated successfully.", updatedJob });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobDetails,
  deleteJob,
  updateJob,
};
