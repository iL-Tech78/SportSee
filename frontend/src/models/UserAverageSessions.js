/**
 * * Modification important que l'examinateur ma demander de faire : Classe UserAverageSessions pour modéliser la durée moyenne des sessions utilisateur
 */
export default class UserAverageSessions {
  constructor(data) {
    this.userId = data.userId;
    this.sessions = Array.isArray(data.sessions)
      ? data.sessions.map((session) => ({
          day: session.day,
          sessionLength: session.sessionLength,
        }))
      : [];
  }
}
