import { useState, useEffect } from "react";
import { Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     setData(getData());
  //   }, [`${events}`]);

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart width={730} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
