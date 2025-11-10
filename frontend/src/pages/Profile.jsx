import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserMainData,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
  IS_USING_MOCK,
} from "../services/api";

import BarChartActivity from "../components/BarChartActivity";
import LineChartAverageSessions from "../components/LineChartAverageSessions";
import RadarChartPerformance from "../components/RadarChartPerformance";
import RadialBarChartScore from "../components/RadialBarChartScore";
import NutrientCard from "../components/NutrientCard";
import "../styles/Profile.css";

export default function Profile() {
  const { id } = useParams();
  const userId = Number(id) || 18;

  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [averageSessions, setAverageSessions] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.info(
      IS_USING_MOCK
        ? "Mode Mock activé : les données proviennent du fichier mockData.js"
        : "Mode API activé : les données proviennent du backend http://localhost:3000"
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [main, activity, sessions, performance] = await Promise.all([
          getUserMainData(userId),
          getUserActivity(userId),
          getUserAverageSessions(userId),
          getUserPerformance(userId),
        ]);

        if (!main) throw new Error("Impossible de charger les données principales.");

        setUserData(main);
        setActivityData(activity);
        setAverageSessions(sessions);
        setPerformanceData(performance);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
        setError("Impossible de charger les données utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p className="loading">Chargement des données...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!userData) return <p className="error">Aucune donnée disponible.</p>;

  const { firstName } = userData;
  const keyData = userData.keyData;
  const score = userData.todayScore || userData.score;

  return (
    <main className="profile-container">
    <div className="container-switcher">
      <div className={`mode-banner ${IS_USING_MOCK ? "mock" : "api"}`}>
        {IS_USING_MOCK ? "Mode : Données Mockées" : "Mode : Données API Réelles"}
      </div>
      <div className="user-switch">
        <a href="/profile/12" className="user-btn">Voir Karl (ID 12)</a>
        <a href="/profile/18" className="user-btn">Voir Cecilia (ID 18)</a>
      </div>
    </div>
      <section className="profile-header">
        <h1>
          Bonjour <span className="profile-name">{firstName}</span>
        </h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>

      <section className="charts-container">
        <div className="chart-item large">
          <BarChartActivity userId={userId} activityData={activityData} />
        </div>
        <div className="chart-item">
          <LineChartAverageSessions userId={userId} sessionsData={averageSessions} />
        </div>
        <div className="chart-item">
          <RadarChartPerformance userId={userId} performanceData={performanceData} />
        </div>
        <div className="chart-item">
          <RadialBarChartScore userId={userId} score={score} />
        </div>
      </section>

      <aside className="nutrients-container">
        <NutrientCard type="calorie" value={keyData.calorieCount} label="Calories" icon="energy" />
        <NutrientCard type="protein" value={keyData.proteinCount} label="Protéines" icon="chicken" />
        <NutrientCard type="carb" value={keyData.carbohydrateCount} label="Glucides" icon="apple" />
        <NutrientCard type="fat" value={keyData.lipidCount} label="Lipides" icon="burger" />
      </aside>
    </main>
  );
}
