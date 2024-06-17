import { useState } from "react";

const Event = ({ event }) => {
const [showDetails, setShowDetails] = useState(false);

let detailsChoice = showDetails ? "Hide Details" : "Show Details";

const handleToggleDetails = () => {
    setShowDetails(!showDetails);
    detailsChoice = showDetails ? "Hide Details" : "Show Details";
}

  return (
    <li>
      <p>{event.summary}</p>
      <p>{event.created}</p>
      <p>{event.location}</p>
        <button
        onClick={() => handleToggleDetails()}
        >{detailsChoice}</button>
        {showDetails && 
        <div className="details"></div>
        }
    </li>
  );
};

export default Event;
