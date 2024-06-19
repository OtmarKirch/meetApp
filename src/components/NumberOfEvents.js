import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE}) => {
    //const [currentNOE, setCurrentNOE] = useState("32")

    const handleNumberOfEvents = (event)=>{
       const value = event.target.value
       console.log(typeof(setCurrentNOE))
       setCurrentNOE(value)
    }


    const testFunction = (val)=>{
        console.log("this is a test with value" + val)
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