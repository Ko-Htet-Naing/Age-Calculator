const calculateAge = require("./index.js").calculateAge; // import from index.js

describe("Calculating Age", function () {
  test("Calculate with fix date of birth", function () {
    const birthYear = 2000;
    const birthMonth = 1;
    const birthDay = 12;
    const age = calculateAge(birthDay, birthMonth, birthYear);

    expect(age).toBe(24);
  });
});
