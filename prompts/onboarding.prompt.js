export default function onboardingPrompt(projectInfo) {
  return `
As an AI assistant, generate a project onboarding overview
for a new engineer joining the team.

Include:

* What the project is
* Key technologies
* Overall scope
* Where to start
* Important files

Project info:
${JSON.stringify(projectInfo, null, 2)}
`;
}
