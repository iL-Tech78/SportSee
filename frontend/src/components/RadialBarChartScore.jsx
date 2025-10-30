import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getUserMainData } from "../services/api";
import "../styles/RadialBarChartScore.css";

function RadialBarChartScore({ userId }) {
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const userData = await getUserMainData(userId);
        const userScore = userData.todayScore || userData.score || 0;
        setScore(userScore * 100);
      } catch (err) {
        console.error("Erreur lors de la récupération du score :", err);
        setError("Impossible de charger le score utilisateur.");
      }
    };

    fetchScore();
  }, [userId]);

  if (error) return <div className="chart-error">{error}</div>;

  const data = [{ name: "Score", value: score, fill: "#FF0000" }];

  return (
    <div className="radialbar-chart">
      <h2 className="radialbar-title">Score</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="80%"
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={50}
            fill="#FF0000"
            background={{ fill: "#FBFBFB" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="radialbar-center">
        <p className="radialbar-value">{score}%</p>
        <p className="radialbar-text">
          de votre <br /> objectif
        </p>
      </div>
    </div>
  );
}

export default RadialBarChartScore;
