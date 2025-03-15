module.exports = {
  preset: 'react-scripts',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom/index.js"
  },
  transformIgnorePatterns: ['/node_modules/'],
};

