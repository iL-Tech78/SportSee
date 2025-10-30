import React, { useEffect, useState } from "react";
import BarChartActivity from "../components/BarChartActivity";
import LineChartAverageSessions from "../components/LineChartAverageSessions";
import RadarChartPerformance from "../components/RadarChartPerformance";
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
    <main className="profile-page">
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

            <div className="chart-placeholder">RadialBarChart score moyen</div>
          </div>
        </div>

        
        <div className="profile-dashboard-right">
          <div className="card-placeholder">Calories</div>
          <div className="card-placeholder">Protéines</div>
          <div className="card-placeholder">Glucides</div>
          <div className="card-placeholder">Lipides</div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
