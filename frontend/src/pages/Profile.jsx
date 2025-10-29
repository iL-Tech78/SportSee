import { useEffect, useState } from "react";
import { getUserData } from "../services/api";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData(12); // id 12 = Karl
      setUser(userData);
    }
    fetchData();
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <main className="profile-page">
      <section className="profile-header">
        <h1>
          Bonjour <span className="user-name">{user.userInfos.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </section>

      <section className="profile-content">
        <div className="charts">
          <div className="barchart">BarChart activité quotidienne</div>
          <div className="linechart">LineChart durée moyenne des sessions</div>
          <div className="radarchart">RadarChart types d’activité</div>
          <div className="radialchart">RadialBarChart score moyen</div>
        </div>

        <aside className="key-data">
          <div className="card">Calories</div>
          <div className="card">Protéines</div>
          <div className="card">Glucides</div>
          <div className="card">Lipides</div>
        </aside>
      </section>
    </main>
  );
}

export default Profile;
