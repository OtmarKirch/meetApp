import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import CityEventsCharts from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart"
import * as api from "./api";
import { ErrorAlert, InfoAlert, WarningAlert } from "./components/Alert";

import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState(32);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert(
        "You are using the app offline. Data will only be updated if you go online."
      );
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await api.getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(api.extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container" id="warning-alert">
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
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
      <div className="charts-container">
        <CityEventsCharts allLocations={allLocations} events={events} />
        <EventGenresChart events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;
