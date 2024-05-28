const {
  TragedyCalculator,
  ComedyCalculator,
} = require("./PerformanceCalculator");

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}

const createStatementData = (invoice, plays) => {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount();
  statementData.totalVolumeCredits = totalVolumeCredits();
  return statementData;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerf) {
    return plays[aPerf.playID];
  }

  function totalAmount() {
    let totalAmount = 0;
    for (let perf of statementData.performances) {
      totalAmount += perf.amount;
    }
    return totalAmount;
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of statementData.performances) {
      volumeCredits += perf.volumeCredits;
    }
    return volumeCredits;
  }
};

module.exports = createStatementData;
