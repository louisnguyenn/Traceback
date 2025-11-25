export default function summarizeDiffsPrompt(projectInfo) {
  return `

Project info:
${JSON.stringify(projectInfo, null, 2)}
`;
}
