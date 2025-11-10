/**
 * * Modification important que l'examinateur ma demander de faire : Classe UserActivity pour modéliser l'activité quotidienne de l'utilisateur
 */
export default class UserActivity {
  constructor(data) {
    this.userId = data.userId;
    this.sessions = Array.isArray(data.sessions)
      ? data.sessions.map((session) => ({
          day: session.day,
          kilogram: session.kilogram,
          calories: session.calories,
        }))
      : [];
  }
}
