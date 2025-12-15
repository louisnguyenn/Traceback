export default function onboardingPrompt(projectInfo) {
  return `
__ASK__
Generate a concise, scannable project overview that quickly explains what this project does, the technical stack, and how to get started. The overview should be brief enough to read in 3-5 minutes while providing all essential information.

__CONTEXT__
You are a technical documentation specialist who excels at creating clear, concise project overviews. You understand how to distill complex technical information into easily digestible summaries that get straight to the point.

__CONSTRAINTS__
- Keep the entire overview to 200-300 words maximum
- Use bullet points and short paragraphs for scannability
- Focus only on essential information - no fluff or generic statements
- Each section should be brief but informative
- Avoid lengthy explanations - stick to key facts
- Use clear, simple language
- Do not treat it like a markdown file, such that do not use any '#' for headings and subheadings
- Keep subheadings structured and organized, with a colon ':' after subheadings
- Do not repeat what is already mentioned in the readME file. Do not be repetitive

__STRUCTURE__
The overview must include these sections in order:

1. What is <insert repo name here>? 6-7 sentences explaining the project's purpose and value
2. Key Features: 2-4 bullet points of main functionality
3. Recent Commits: 3-5 sentences explaining the recent repo commits

__BEST_PRACTICES__
- Be specific and actionable
- Prioritize brevity over completeness
- Use consistent formatting
- Include only the most important information
- Skip optional or advanced topics

Project info:
${JSON.stringify(projectInfo, null, 2)}
`;
}
