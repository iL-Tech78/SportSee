/**
 * * Modification important que l'examinateur ma demander de faire : Classe UserMainData pour modéliser les données principales de l'utilisateur
 */
export default class UserMainData {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.userInfos.firstName;
    this.lastName = data.userInfos.lastName;
    this.age = data.userInfos.age;
    this.todayScore = data.todayScore || data.score;
    this.keyData = data.keyData;
  }
}
