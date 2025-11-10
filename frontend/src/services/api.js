import UserMainData from "../models/UserMainData";
import UserActivity from "../models/UserActivity";
import UserAverageSessions from "../models/UserAverageSessions";
import UserPerformance from "../models/UserPerformance";
import { mockData } from "../data/mockData";

/**
Modifications importante suite au retour de l'examinateur : 
 * Création des classes de modélisation (UserMainData, UserActivity, etc.) pour uniformiser mes objets et sécuriser mes composants.

Ajout de la possibilité de basculer entre :
 * les données réelles de l’API (USE_MOCK = false)
 * les données mockées du fichier mockData.js (USE_MOCK = true)

l'objectif : l'idée ici est de permettre à l’application de fonctionner quelle que soit la source de données (API ou mock), avec une structure de données cohérente et fiable.
 
*/


/**
 * C'est ici qu'on peut maintenant donc Activer ou désactiver les données mockées
 * true  → les données viennent du fichier mock
 * false → les données viennent de l’API réelle
 */

// const USE_MOCK = false;
const USE_MOCK = true;
const BASE_URL = "http://localhost:3000/user";

/* ---------------------------------------
  1. Données principales utilisateur
----------------------------------------- */
export async function getUserMainData(userId) {
  try {
    if (USE_MOCK) {
      const data = mockData.USER_MAIN_DATA.find((item) => item.id === userId);
      return new UserMainData(data);
    }

    const response = await fetch(`${BASE_URL}/${userId}`);
    if (!response.ok) throw new Error("Erreur API principale");
    const data = await response.json();
    return new UserMainData(data.data);
  } catch (error) {
    console.error("Erreur dans getUserMainData:", error);
    throw error;
  }
}

/* ---------------------------------------
  2. Activité quotidienne (composant bar chart)
----------------------------------------- */
export async function getUserActivity(userId) {
  try {
    if (USE_MOCK) {
      const data = mockData.USER_ACTIVITY.find(
        (item) => item.userId === userId
      );
      return new UserActivity(data);
    }

    const response = await fetch(`${BASE_URL}/${userId}/activity`);
    if (!response.ok) throw new Error("Erreur API activité");
    const data = await response.json();
    return new UserActivity(data.data);
  } catch (error) {
    console.error("Erreur dans getUserActivity:", error);
    throw error;
  }
}

/* ---------------------------------------
   3️. Durée moyenne des sessions (conpoosant line chart)
----------------------------------------- */
export async function getUserAverageSessions(userId) {
  try {
    if (USE_MOCK) {
      const data = mockData.USER_AVERAGE_SESSIONS.find(
        (item) => item.userId === userId
      );
      return new UserAverageSessions(data);
    }

    const response = await fetch(`${BASE_URL}/${userId}/average-sessions`);
    if (!response.ok) throw new Error("Erreur API sessions moyennes");
    const data = await response.json();
    return new UserAverageSessions(data.data);
  } catch (error) {
    console.error("Erreur dans getUserAverageSessions:", error);
    throw error;
  }
}

/* ---------------------------------------
   4️. Performance utilisateur (composant radar chart)
----------------------------------------- */
export async function getUserPerformance(userId) {
  try {
    if (USE_MOCK) {
      const data = mockData.USER_PERFORMANCE.find(
        (item) => item.userId === userId
      );
      return new UserPerformance(data);
    }

    const response = await fetch(`${BASE_URL}/${userId}/performance`);
    if (!response.ok) throw new Error("Erreur API performance");
    const data = await response.json();
    return new UserPerformance(data.data);
  } catch (error) {
    console.error("Erreur dans getUserPerformance:", error);
    throw error;
  }
}

// J'export le mode utilisé pour que je puisse l'affichage dans le front
export const IS_USING_MOCK = USE_MOCK;
