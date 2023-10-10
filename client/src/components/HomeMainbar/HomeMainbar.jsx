import React, { useState } from "react";
import "./HomeMainbar.css";
import { Link } from "react-router-dom";



const HomeMainbar = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [jobs, setJobs] = useState([]);
  const ADZUNA_API_KEY = "27ed842cf43461509724c651130d52de"; 

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=193847a9&app_key=${ADZUNA_API_KEY}&results_per_page=10&what=${selectedSkill}&where=${selectedLocation}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      
      const jobResults = data.results.map((result) => ({
        title: result.title,
        company: result.company.display_name,
        location: result.location.display_name,
        url: result.redirect_url,
      }));

      setJobs(jobResults);
      console.log(`User is looking for a job in ${selectedSkill} in ${selectedLocation}`);
    } catch (error) {
      console.error(error);
    }
  };

  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "20px"
  };

  return (
    <div className="main1">
      <h1>Land a Job that suits you</h1>
      <div className="main2">
        <p>What skills are you looking for in a job?</p>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={selectedSkill}
              onChange={handleSkillChange}
              placeholder="e.g., JavaScript, Python, Java"
            />
          </label>
          <p>Enter location:</p>
          <label>
            <input
              type="text"
              value={selectedLocation}
              onChange={handleLocationChange}
              placeholder="Location"
            />
          </label>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>

      
      <div>
        <h2>Job Results</h2>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <strong>{job.title}</strong> - {job.company} - {job.location}
              <br />
              <a href={job.url} target="_blank" rel="noopener noreferrer"> View Job</a>
                
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeMainbar;
