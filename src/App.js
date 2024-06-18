import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import * as api from './api';

import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    const allEvents = await api.getEvents();
    setEvents(allEvents.slice(0, currentNOE));
    setAllLocations(api.extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} />
      <EventList events={events} />
      <NumberOfEvents />
    </div>
  );
}

export default App;
