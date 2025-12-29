// jest.config.js
export default {
  transform: {}, // Ingen Babel eller annan transformering – viktigt!
  testEnvironment: "jsdom", // Ger oss document, window m.m. i testerna
  collectCoverage: true, // Samla coverage automatiskt varje gång
  coverageDirectory: "coverage", // Mapp där coverage-rapporterna hamnar
  collectCoverageFrom: [
    "js/**/*.js", // Alla JS-filer i js-mappen
    "!js/main.js", // Exkludera main.js (valfritt)
  ],
  testMatch: [
    "**/__tests__/**/*.js", // Hitta tester i __tests__-mappen
    "**/*.test.js", // Och tester med .test.js någonstans
  ],
};
