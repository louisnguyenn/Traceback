// This function contains all of the github colour schemes for every coding language
export const languageColors = {
  // JavaScript ecosystem
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'Node.js': '#68a063',
  React: '#61dafb',
  Vue: '#4fc08d',

  // Python
  Python: '#3572A5',

  // Web
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',

  // Backend
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',

  // Mobile
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',

  // Other
  Shell: '#89e051',
  Dockerfile: '#384d54',
  YAML: '#cb171e',
  JSON: '#292929',
  Markdown: '#083fa1',
  SQL: '#e38c00',

  // Default fallback
  default: '#8b949e',
};

/**
 * Get color for a language
 * @param {string} language - Language name
 * @returns {string} Hex color code
 */
export function getLanguageColor(language) {
  return languageColors[language] || languageColors.default;
}

/**
 * Get Tailwind classes for a language badge
 * @param {string} language - Language name
 * @returns {object} Style object with backgroundColor
 */
export function getLanguageStyle(language) {
  return {
    backgroundColor: getLanguageColor(language),
  };
}
