import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TrainSchedule = () => {
  const [allTrainData, setAllTrainData] = useState([]);
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxMDA0MjgsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMDA5NTI3YzYtYmE4Ny00NTU4LTk4YjEtNGZjNDEwYjAzNTNmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IkVDMjBCMTA3MSJ9.6mGqFGsHC2trhSYnaTmL6rN2edZjF8ylpuhvCtHa8X0";

  useEffect(() => {
    axios
      .get("http://20.244.56.144/train/trains", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAllTrainData(response.data);
        console.log(allTrainData);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
      });
  }, []);

  console.log(allTrainData);

  return (
    <div className="container">
      <h1 className="mt-4">All Trains Schedule</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Seats Available (Sleeper)</th>
            <th>Seats Available (AC)</th>
            <th>Price (Sleeper)</th>
            <th>Price (AC)</th>
            <th>Delay (Minutes)</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {allTrainData.map((train, index) => (
            <tr key={index}>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>
                {train.departureTime.Hours}:{train.departureTime.Minutes}
              </td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.price.AC}</td>
              <td>{train.delayedBy}</td>
              <td>
                <Link
                  to={`/single-train/${train.trainNumber}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainSchedule;
