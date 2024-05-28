const { samplePlays, sampleInvoice } = require("./sampleData");
const statement = require("./statement");

(() => {
  const testStatement = statement(sampleInvoice, samplePlays);
  if (
    testStatement ===
    "<h1>Statement for BigCo</h1>\n" +
      "<table>\n" +
      "<tr><th>play</th><th>seats</th><th>cost</th></tr>" +
      "<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n" +
      "<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n" +
      "<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n" +
      "</table>\n" +
      "<p>Amount owed is <em>$1,730.00</em></p>\n" +
      "<p>You earned <em>47</em> credits</p>\n" +
      ""
  ) {
    console.log("✅✅✅PASS✅✅✅");
  } else {
    console.error("❌❌❌FAIL❌❌❌");
    console.log("---Returned:");
    console.log(testStatement);
    console.log("---Should be:");
    console.log(
      "<h1>Statement for BigCo</h1>\n" +
        "<table>\n" +
        "<tr><th>play</th><th>seats</th><th>cost</th></tr>" +
        "<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n" +
        "<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n" +
        "<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n" +
        "</table>\n" +
        "<p>Amount owed is <em>$1,730.00</em></p>\n" +
        "<p>You earned <em>47</em> credits</p>\n" +
        ""
    );
  }
})();
