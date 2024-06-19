import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import * as api from './api';

import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(()=>{
    fetchData();
  }, [currentCity, currentNOE]);

 
  const fetchData = async () => {
    const allEvents = await api.getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(api.extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE}/>
      <EventList events={events} />
    </div>
  );
}

export default App;
