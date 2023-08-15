import React from "react";

const SingleTrainCard = ({ train }) => {
  return (
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
      </div>
    </div>
  );
};

export default SingleTrainCard;
