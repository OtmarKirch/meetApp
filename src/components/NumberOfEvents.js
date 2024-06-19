const NumberOfEvents = ({setCurrentNOE}) => {

    const handleNumberOfEvents = (event)=>{
       const value = event.target.value
       setCurrentNOE(value)
    }


    return (
        <div id="event-number">
            <label>Number of events: </label>
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