import { useState, useEffect } from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const CityEventsCharts = ({ allLocations, events}) => {
    const [data, setData] = useState([])

    useEffect(()=>{
        setData(getData())
    }, [`${events}`])

    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).lenght
            const city = location.split(", ")[0]
            return { city, count }
        })
        return data;
    }

}

export default CityEventsCharts;