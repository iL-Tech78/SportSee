import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import "../styles/RadarChartPerformance.css";

export default function RadarChartPerformance({ performanceData }) {
  if (!performanceData || !performanceData.data) {
    console.warn("Données de performance manquantes :", performanceData);
    return <p className="chart-loading">Données des performances indisponibles</p>;
  }

  const formattedData = performanceData.data.map((item) => ({
    value: item.value,
    kind: performanceData.kind[item.kind],
  }));

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="65%"
          data={formattedData}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            stroke="#FFFFFF"
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Radar
            dataKey="value"
            fill="#FF0101"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
