import React, { useState, useEffect } from "react";
import TrainCard from "./TrainCard";
import axios from "axios";

const TrainSchedule = () => {
  const [allTrainData, setAllTrainData] = useState([]);
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwOTgzODEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMDA5NTI3YzYtYmE4Ny00NTU4LTk4YjEtNGZjNDEwYjAzNTNmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IkVDMjBCMTA3MSJ9.HBD732XYcc6CGqQh-_0FqQ8QzOAWxlswaKVQnUE2xag"; // Replace with your actual Bearer token

  useEffect(() => {
    // Fetch train data from the API with authorization header
    axios
      .get("http://20.244.56.144/train/trains", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAllTrainData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4">All Trains Schedule</h1>
      <div className="row mt-4">
        {allTrainData.map((train, index) => (
          <TrainCard key={index} train={train} />
        ))}
      </div>
    </div>
  );
};

export default TrainSchedule;
