import { useEffect, useState } from "react";
import { getUserData } from "../services/api";
import "../styles/Profile.css";


function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData(12); // ici je mets mon id 12 = Karl
      setUser(userData);
    }
    fetchData();
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="profile">
      <h1>
        Bonjour <span>{user.userInfos.firstName}</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}

export default Profile;