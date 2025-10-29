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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="linechart-tooltip">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomCursor = ({ points, width }) => {
  const { x } = points[0];
  return <Rectangle fill="rgba(0, 0, 0, 0.1)" x={x} width={width - x} height={300} />;
};

const LineChartAverageSessions = ({ userId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserAverageSessions(userId);
        const formattedData = result.sessions.map((session) => ({
          day: session.day,
          sessionLength: session.sessionLength,
        }));
        setData(formattedData);
      } catch (err) {
        setError("Erreur : impossible de charger les sessions moyennes.");
      }
    };
    fetchData();
  }, [userId]);

  if (error) return <div>{error}</div>;

  const days = ["L", "M", "M", "J", "V", "S", "D"];

  return (
    <div className="linechart-container">
      <h3 className="linechart-title">Durée moyenne des sessions</h3>

      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 70, right: 20, left: 20, bottom: 10 }}
        >
          <XAxis
            dataKey="day"
            tickFormatter={(day) => days[day - 1]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#FFF", opacity: 0.7, fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFF"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "rgba(255, 255, 255, 0.4)",
              strokeWidth: 8,
              r: 4,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartAverageSessions;
