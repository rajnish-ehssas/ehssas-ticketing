"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import RButton from "@/childComponent/RButton";
// import RInput from "@/childComponent/RInput";

interface JobOpening {
  id: number;
  title: string;
  description: string;
}
const Career: React.FC = () => {
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);

  // Example job openings
  const jobOpenings = [
    { id: 1, title: "Frontend Developer", description: "Job description for Frontend Developer." },
    { id: 2, title: "Backend Developer", description: "Job description for Backend Developer." },
    { id: 3, title: "Data Analyst", description: "Job description for Data Analyst." },
  ];

  const handleJobClick = (job: JobOpening) => {
    setActiveJob(job);
  };

  const clearActiveJob = () => {
    setActiveJob(null);
  };
  // const [value, setValue] = useState("");
  return (
    <div className={styles.careerContainer}>
      {/* Left Section */}
      {/* Left Section */}
      <div className={styles.leftSection}>
        <h2>Current Openings</h2>
        {jobOpenings.length > 0 ? (
          <ul>
            {jobOpenings.map((job) => (
              <li key={job.id} onClick={() => handleJobClick(job)}>
                {job.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No current openings. Please check back later or submit your CV for future consideration.</p>
        )}
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        {activeJob ? (
          <div>
            <h2>{activeJob.title}</h2>
            <p>{activeJob.description}</p>
            <RButton
              onClick={() => clearActiveJob()}
              buttonText='Back'
              className={styles.submitButton}
            />
            <RButton
              buttonText='Apply'
              className={styles.applyButton}
            />
          </div>
        ) : (
          <div>
            <h2>Submit Your Details</h2>
            <p>Even if there are no openings currently, feel free to submit your CV and cover letter for future opportunities.</p>
            <form className={styles.candidateForm}>
              <div>
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" required />                
              </div>
              <div>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div>
                <label>Upload Cover Letter:</label>
                <input type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div>
                <label>Upload CV:</label>
                <input type="file" accept=".pdf,.doc,.docx" required />
              </div>
              <RButton
                type="submit"
                buttonText='Submit'
                className={styles.submitButton}
              />
              {/* <button type="submit" className={styles.submitButton}>
                Submit
              </button> */}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Career;
