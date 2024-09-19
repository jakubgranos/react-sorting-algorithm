const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        low: '#FFFF00',
        middle: '#FFFF00',
        high: '#FFA500',
        pivot: '#0000FF',
        left: '#FF0000',
        segment: '#ADD8E6',
        right: '#0000FF',
        sorted: '#008000',
        'sorting-active': '#EF4444',
        'sorting-inactive': '#3B82F6',
      },
    },
  },
  plugins: [],
};
