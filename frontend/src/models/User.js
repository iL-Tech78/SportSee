/**
 * Modification important que l'examinateur ma demander de faire : Classe User pour modéliser les données principales d'un utilisateur
 */
export default class User {
    constructor(data) {
      this.id = data.id;
      this.firstName = data.userInfos?.firstName ?? "Inconnu";
      this.lastName = data.userInfos?.lastName ?? "";
      this.age = data.userInfos?.age ?? null;
      this.todayScore = data.todayScore ?? data.score ?? 0;
      this.keyData = data.keyData ?? {
        calorieCount: 0,
        proteinCount: 0,
        carbohydrateCount: 0,
        lipidCount: 0,
      };
    }
  }
  