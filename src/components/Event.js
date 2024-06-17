import { useState } from "react";

const Event = ({ event }) => {
const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <p>{event.summary}</p>
      <p>{event.created}</p>
      <p>{event.location}</p>
        <button>Show Details</button>
        {showDetails && 
        <div className="details"></div>
        }
    </li>
  );
};

export default Event;
