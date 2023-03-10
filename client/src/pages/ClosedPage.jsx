import React from "react";

const ClosedPage = ({ OpenHours }) => {
  return (
    <div className="closedMessage">
      <h1>We are closed today!</h1>
      <h3>Our opening hours are:</h3>
      {OpenHours.map((hours, index) =>
        hours.open.hour ? (
          <p key={index}>
            {hours.day} : {hours.open.hour} - {hours.close.hour}
          </p>
        ) : (
          <p key={index}>{hours.day} : Closed</p>
        )
      )}
    </div>
  );
};

export default ClosedPage;
