module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    'jest-styled-components',
    '@testing-library/jest-dom/extend-expect',
  ],
}
