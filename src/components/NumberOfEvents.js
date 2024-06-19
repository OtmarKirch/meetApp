import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE}) => {

    const handleNumberOfEvents = (event)=>{
       const value = event.target.value
       setCurrentNOE(value)
    }


    return (
        <div id="event-number">
            <input 
            type="text" 
            placeholder="Enter number of events"
            defaultValue="32"
            onChange={handleNumberOfEvents}
            />
        </div>
    );
}

export default NumberOfEvents;