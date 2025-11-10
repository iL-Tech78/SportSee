/**
 * * Modification important que l'examinateur ma demander de faire : Classe UserPerformance pour modéliser les performance de l'utilisateur
 */
export default class UserPerformance {
  constructor(data) {
    this.userId = data.userId;
    this.kind = data.kind;
    this.data = data.data.map((item) => ({
      value: item.value,
      kind: item.kind,
    }));
  }
}
