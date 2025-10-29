/** Commentaire JSDoc pour documenter ma fonction getUserData 
 * @description Je récup les données principales d’un utilisateur
 * @param {number} userId  La fonction prend en paramètre un nombre qui seras l'id de l'utilisateur 
 * @returns {Promise<object>} La fonction retourne une promesse qui contiendra un objet dans lequel il y aura les données de l’utilisateur.
 */
export async function getUserData(userId) { // ici userId vas être egale à 12 ou à 18, je async pour utiliser "await" et donc attendre la réponse du serveur sans bloquer l’exécution.
    try { // mon try catch pour gérer les erreurs 
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erreur lors du fetch user data:', error);
      return null;
    }
}
  
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
