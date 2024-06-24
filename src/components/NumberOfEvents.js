const NumberOfEvents = ({setCurrentNOE, setErrorAlert}) => {

    const handleNumberOfEvents = (event)=>{
       const value = event.target.value
       if (!/^\d+$/.test(value)){
        setErrorAlert("You can only use numbers to set the number of events shown.")
       }else{
        setCurrentNOE(value)
        setErrorAlert("")
       }
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