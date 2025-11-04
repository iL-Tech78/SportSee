import React, { useEffect, useState } from "react";
import BarChartActivity from "../components/BarChartActivity";
import LineChartAverageSessions from "../components/LineChartAverageSessions";
import RadarChartPerformance from "../components/RadarChartPerformance";
import RadialBarChartScore from "../components/RadialBarChartScore";
import NutrientCard from "../components/NutrientCard";
import iconCalories from "../assets/icon-calories.svg";
import iconProteines from "../assets/icon-proteines.svg";
import iconGlucides from "../assets/icon-glucides.svg";
import iconLipides from "../assets/icon-lipides.svg";
import { getUserPerformance } from "../services/api";
import "../styles/Profile.css";

function Profile() {
  const userId = 12; // ID de l'utilisateur (Karl)
  const [performanceData, setPerformanceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const data = await getUserPerformance(userId);
        setPerformanceData(data);
      } catch (err) {
        console.error("Erreur de récupération des performances :", err);
        setError("Impossible de charger les données de performance.");
      }
    };

    fetchPerformance();
  }, [userId]);

  return (
    <div className="container">
      <div className="profile-header">
        <h1>
          Bonjour <span className="profile-name">Karl</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <section className="profile-dashboard">
        
        <div className="profile-dashboard-left">
          <BarChartActivity userId={userId} />

          <div className="profile-bottom-charts">
            <LineChartAverageSessions userId={userId} />

            
            {error ? (
              <div className="chart-placeholder">{error}</div>
            ) : (
              <RadarChartPerformance data={performanceData} />
            )}

            <div className="chart-placeholder">
              <RadialBarChartScore userId={userId} />
            </div>

          </div>
        </div>

        <div className="profile-dashboard-right">
          <NutrientCard
            icon={iconCalories}
            value={1930}
            unit="kCal"
            label="Calories"
            color="rgba(255, 0, 0, 0.1)"
          />
          <NutrientCard
            icon={iconProteines}
            value={155}
            unit="g"
            label="Protéines"
            color="rgba(74, 184, 255, 0.1)"
          />
          <NutrientCard
            icon={iconGlucides}
            value={290}
            unit="g"
            label="Glucides"
            color="rgba(249, 206, 35, 0.1)"
          />
          <NutrientCard
            icon={iconLipides}
            value={50}
            unit="g"
            label="Lipides"
            color="rgba(253, 81, 129, 0.1)"
          />
        </div>
      </section>
    </div>
  );
}

export default Profile;
