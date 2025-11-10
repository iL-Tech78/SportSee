import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { getUserAverageSessions } from "../services/api";
import "../styles/LineChartAverageSessions.css";

export default function LineChartAverageSessions({ userId }) {
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserAverageSessions(userId);
        const days = ["L", "M", "M", "J", "V", "S", "D"];
        const formatted = data.sessions.map((s, i) => ({
          ...s,
          day: days[i],
        }));

        setSessions(formatted);
      } catch (err) {
        console.error("Erreur chargement sessions :", err);
        setError("Impossible de charger les données des sessions.");
      }
    };
    fetchData();
  }, [userId]);

  if (error) return <p className="chart-error">{error}</p>;
  if (!sessions) return <p className="chart-loading">Chargement...</p>;

  return (
    <div className="linechart-container">
      <h2 className="linechart-title">Durée moyenne des sessions</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessions}
          margin={{ top: 70, right: 15, left: 15, bottom: 20 }}
          onMouseMove={(e) => {
            if (e.isTooltipActive) {
              setActiveIndex(e.activeTooltipIndex);
            } else {
              setActiveIndex(null);
            }
          }}
        >
          {activeIndex !== null && (
            <rect
              x={(activeIndex / sessions.length) * 100 + "%"}
              y="0"
              width={`${100 - (activeIndex / sessions.length) * 100}%`}
              height="100%"
              fill="rgba(0, 0, 0, 0.1)"
              className="overlay"
            />
          )}

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.6)" }}
            tickMargin={10}
            style={{ fontSize: "0.9rem" }}
          />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "rgba(255,255,255,0.3)",
              strokeWidth: 10,
              fill: "#fff",
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Tooltip personnalisé ! */
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="linechart-tooltip">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
}
