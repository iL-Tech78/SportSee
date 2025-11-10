import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getUserActivity } from "../services/api";
import "../styles/BarChartActivity.css";


export default function BarChartActivity({ userId }) {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getUserActivity(userId);
        const formattedData = data.sessions.map((session, index) => ({
          ...session,
          day: index + 1,
        }));

        setActivity(formattedData);
      } catch (err) {
        console.error("Erreur de chargement des données d'activité :", err);
        setError("Impossible de charger les données d'activité");
      }
    };
    fetchActivity();
  }, [userId]);

  if (error) return <p className="chart-error">{error}</p>;
  if (!activity) return <p className="chart-loading">Chargement...</p>;

  return (
    <div className="barchart-container">
      <div className="barchart-header">
        <h2>Activité quotidienne</h2>
        <div className="barchart-legend">
          <span className="legend-item black-dot">Poids (kg)</span>
          <span className="legend-item red-dot">Calories brûlées (kCal)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={activity}
          margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tick={{ fill: "#9B9EAC" }}
            tickMargin={10}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
            domain={["dataMin - 1", "dataMax + 2"]}
          />
          <YAxis yAxisId="left" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
          />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Tooltip personnalisé ! */
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="barchart-tooltip">
        <p>{`${payload[0].value}kg`}</p>
        <p>{`${payload[1].value}Kcal`}</p>
      </div>
    );
  }
  return null;
}
