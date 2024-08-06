module.exports = {
  // Configuration for JavaScript files
  extends: [
    "next/core-web-vitals", // Needed to avoid warning in next.js build: 'The Next.js plugin was not detected in your ESLint configuration'
  ],
  rules: {
    "@next/next/no-img-element": "off",
  },
};
