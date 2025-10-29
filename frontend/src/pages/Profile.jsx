import React from "react";
import BarChartActivity from "../components/BarChartActivity";
import LineChartAverageSessions from "../components/LineChartAverageSessions";
import "../styles/Profile.css";

function Profile() {
  const userId = 12;

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
            
            <div className="chart-placeholder">RadarChart types d’activité</div>
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
