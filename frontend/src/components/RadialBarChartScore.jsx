import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { getUserScore } from "../services/api";
import "../styles/RadialBarChartScore.css";

function RadialBarChartScore({ userId }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchScore() {
      try {
        const data = await getUserScore(userId);
        setScore(data); // Score compris entre 0 et 1
      } catch (error) {
        console.error("Erreur lors du chargement du score:", error);
      }
    }
    fetchScore();
  }, [userId]);

  const data = [
    {
      name: "Score",
      value: score * 100,
      fill: "#FF0000",
    },
  ];

  return (
    <div className="radial-chart-container">
      <h3 className="radial-chart-title">Score</h3>
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
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="radial-chart-center">
        <p className="radial-chart-score">{`${score * 100}%`}</p>
        <p className="radial-chart-text">de votre objectif</p>
      </div>
    </div>
  );
}

export default RadialBarChartScore;

