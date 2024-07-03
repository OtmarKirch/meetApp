import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import * as api from "./api";
import { ErrorAlert, InfoAlert } from "./components/Alert";

import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState(32);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await api.getEvents();
    console.log("Events returned from api.js after getEvents method")
    console.log(allEvents)
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
        console.log("Events after filtering")
        console.log(filteredEvents)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(api.extractLocations(allEvents));
  };

  return (
    <div className="App">
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <div className="alerts-container" id="info-alert">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <div className="alerts-container" id="error-alert">
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;
