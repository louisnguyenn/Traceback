export default function summarizeBranchesPrompt(projectInfo) {
  return `

Project info:
${JSON.stringify(projectInfo, null, 2)}
`;
}
