/**
 * @description Je récupère les données principales d’un utilisateur
 * @param {number} userId - L'identifiant de l'utilisateur
 * @returns {Promise<object>} - Les données principales de l'utilisateur
 */
export async function getUserData(userId) {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`); // Je récup les données utilisateur depuis l’API (http://localhost:3000),
    if (!response.ok) throw new Error("Erreur réseau");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erreur lors du fetch user data:", error);
    return null;
  }
}

/**
 * @description Je récupère les données d'activité quotidienne
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Promise<object>} - Données d'activité
 */
export async function getUserActivity(userId) {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
    if (!response.ok) {
      throw new Error("Erreur de chargement de l'activité");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @description Je récupère les sessions moyennes
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Promise<object>} - Données de sessions
 */
export const getUserAverageSessions = async (userId) => {
  const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
  if (!response.ok) {
    throw new Error("Erreur API - Sessions moyennes");
  }
  const data = await response.json();
  return data.data;
};

/**
 * @description Je récupère les performances utilisateur
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<object>} - Données de performance formatées
 */
export async function getUserPerformance(id) {
  try {
    const response = await fetch(`http://localhost:3000/user/${id}/performance`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des performances");
    const data = await response.json();

    const kindLabels = {
      cardio: "Cardio",
      energy: "Énergie",
      endurance: "Endurance",
      strength: "Force",
      speed: "Vitesse",
      intensity: "Intensité",
    };

    const formattedData = data.data.data.map((item) => ({
      subject: kindLabels[data.data.kind[item.kind]],
      value: item.value,
    }));

    return formattedData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * @description Je récupère les données nutritionnelles (keyData)
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Promise<object>} - Calories, protéines, glucides, lipides
 */
export async function getUserMainData(userId) {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) throw new Error("Erreur réseau");
    const data = await response.json();
    return data.data.keyData; // Je renvoie uniquement les données nutritionnelles
  } catch (error) {
    console.error("Erreur lors du fetch user keyData:", error);
    return null;
  }
}

/**
 * @description J récupère le score global de l'utilisateur
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Promise<number>} - Score utilisateur (entre 0 et 1)
 */
export async function getUserScore(userId) {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) throw new Error("Erreur lors du chargement du score utilisateur");
    const data = await response.json();

    // Iici car certains utilisateurs ont "todayScore", d'autres "score"
    return data.data.todayScore ?? data.data.score;
  } catch (error) {
    console.error("Erreur lors du fetch du score:", error);
    return 0;
  }
}
