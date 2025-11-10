import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import "../styles/RadialBarChartScore.css";

export default function RadialBarChartScore({ score }) {

  if (score === null || score === undefined || isNaN(score)) {
    console.warn("Score invalide ou non défini :", score);
    return <p className="chart-loading">Données du score indisponibles</p>;
  }

  const scoreValue =
    typeof score === "object"
      ? score.todayScore || score.score || 0
      : score;

  const data = [
    {
      name: "Score",
      value: scoreValue * 100,
    },
  ];

  return (
    <div className="radialbarchart-container">
      <h2 className="radialbarchart-title">Score</h2>

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="80%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={50}
            fill="#FF0000"
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="radialbarchart-center">
        <p className="score-value">{data[0].value}%</p>
        <p className="score-text">
          de votre <br /> objectif
        </p>
      </div>
    </div>
  );
}