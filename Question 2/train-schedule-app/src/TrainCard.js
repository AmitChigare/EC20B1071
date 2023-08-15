import React from "react";
import { Link } from "react-router-dom";

const TrainCard = ({ train }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{train.trainName}</h5>
          <p className="card-text">
            Departure Time: {train.departureTime.Hours}:
            {train.departureTime.Minutes}
          </p>
          <p className="card-text">Price (Sleeper): {train.price.sleeper}</p>
          <p className="card-text">Price (AC): {train.price.AC}</p>
          <p className="card-text">
            Seats Available (Sleeper): {train.seatsAvailable.sleeper}
          </p>
          <p className="card-text">
            Seats Available (AC): {train.seatsAvailable.AC}
          </p>
          <p className="card-text">Delay: {train.delayedBy} mins</p>
          <Link
            to={`/single-train/${train.trainNumber}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;
