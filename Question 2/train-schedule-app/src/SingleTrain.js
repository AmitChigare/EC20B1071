import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleTrain = () => {
  const { trainNumber } = useParams();
  const [singleTrain, setSingleTrain] = useState(null);
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxMDA0MjgsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMDA5NTI3YzYtYmE4Ny00NTU4LTk4YjEtNGZjNDEwYjAzNTNmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IkVDMjBCMTA3MSJ9.6mGqFGsHC2trhSYnaTmL6rN2edZjF8ylpuhvCtHa8X0";

  useEffect(() => {
    axios
      .get(`http://20.244.56.144/train/trains/${trainNumber}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setSingleTrain(response.data);
      })
      .catch((error) => {
        console.error("Error fetching single train data:", error);
      });
  }, [trainNumber]);

  return (
    <div className="container">
      <h1 className="mt-4">Single Train Details</h1>
      {singleTrain ? (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{singleTrain.trainName}</h5>
            <p className="card-text">
              Train Number: {singleTrain.trainNumber}
              <br />
              Departure Time: {singleTrain.departureTime.Hours}:
              {singleTrain.departureTime.Minutes}
              <br />
              Seats Available (Sleeper): {singleTrain.seatsAvailable.sleeper}
              <br />
              Seats Available (AC): {singleTrain.seatsAvailable.AC}
              <br />
              Price (Sleeper): {singleTrain.price.sleeper}
              <br />
              Price (AC): {singleTrain.price.AC}
              <br />
              Delay (Minutes): {singleTrain.delayedBy}
            </p>
            <Link to="/" className="btn btn-secondary">
              Back to All Trains
            </Link>
          </div>
        </div>
      ) : (
        <p>Train not found</p>
      )}
    </div>
  );
};

export default SingleTrain;
