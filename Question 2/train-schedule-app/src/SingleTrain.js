import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SingleTrainCard from "./SingleTrainCard";
import axios from "axios";

const SingleTrain = () => {
  const { trainNumber } = useParams();
  const [singleTrain, setSingleTrain] = useState(null);
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwOTgzODEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMDA5NTI3YzYtYmE4Ny00NTU4LTk4YjEtNGZjNDEwYjAzNTNmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IkVDMjBCMTA3MSJ9.HBD732XYcc6CGqQh-_0FqQ8QzOAWxlswaKVQnUE2xag"; // Replace with your actual Bearer token

  useEffect(() => {
    // Fetch single train data from the API with authorization header
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
        <div>
          <SingleTrainCard train={singleTrain} />
          <Link to="/" className="btn btn-secondary mt-3">
            Back to All Trains
          </Link>
        </div>
      ) : (
        <p>Train not found</p>
      )}
    </div>
  );
};

export default SingleTrain;
