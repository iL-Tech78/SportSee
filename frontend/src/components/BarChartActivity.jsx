import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getUserActivity } from "../services/api";
import "../styles/BarChartActivity.css";

// Personnalisation !
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].value} kg`}</p>
        <p>{`${payload[1].value} kCal`}</p>
      </div>
    );
  }
  return null;
};

const BarChartActivity = ({ userId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserActivity(userId);
        const formattedData = result.sessions.map((session, index) => ({
          day: index + 1,
          kilogram: session.kilogram,
          calories: session.calories,
        }));
        setData(formattedData);
      } catch (err) {
        setError("Erreur : impossible de charger les données d'activité.");
      }
    };
    fetchData();
  }, [userId]);

  if (error) return <div>{error}</div>;

  return (
    <div className="barchart-container">
      <div className="barchart-header">
        <h3 className="barchart-title">Activité quotidienne</h3>
        <div className="barchart-legend">
          <div className="barchart-legend-item">
            <span className="legend-dot-black"></span>
            <span>Poids (kg)</span>
          </div>
          <div className="barchart-legend-item">
            <span className="legend-dot-red"></span>
            <span>Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 5,
          }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={{ stroke: "#DEDEDE" }}
            tick={{ fill: "#9B9EAC", fontSize: 12 }}
          />
          <YAxis
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 12 }}
            domain={["dataMin - 1", "dataMax + 1"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]} barSize={7} />
          <Bar dataKey="calories" fill="#E60000" radius={[10, 10, 0, 0]} barSize={7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartActivity;
