module.exports = {
  testEnvironment: "node",
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    "\\.css$": "ts-jest",
    "^(?!.*\\.(js|jsx|css|json)$)": "ts-jest",
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)",
  ],
  modulePathIgnorePatterns: ["<rootDir>/build/*"],
  moduleNameMapper: {
    "@server(.*)": "<rootDir>/src/server$1",
    "@client(.*)": "<rootDir>/src/client$1",
    "@src(.*)": "<rootDir>/src$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};
