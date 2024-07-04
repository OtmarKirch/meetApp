import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  let detailsChoice = showDetails ? "Hide Details" : "Show Details";

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
    detailsChoice = showDetails ? "Hide Details" : "Show Details";
  };

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p className="city">{event.location}</p>
      {showDetails && <div className="details">{event.description}</div>}
      <button className="details-btn" onClick={() => handleToggleDetails()}>
        {detailsChoice}
      </button>
    </li>
  );
};

export default Event;
