export default function summarizeCommitsPrompt(commits) {
  return `
You are an AI assistant that summarizes Git commit history for onboarding developers.

Instructions:

* Explain recent changes clearly and concisely
* Avoid deep technical implementation details unless necessary
* Highlight patterns, major changes, and themes
* Keep the tone professional and helpful

Commits:
${JSON.stringify(commits, null, 2)}
`;
}
