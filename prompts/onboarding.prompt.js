export default function onboardingPrompt(projectInfo) {
  return `
__ASK__
Generate a comprehensive, well-organized project onboarding overview that enables a new engineer to quickly understand the project's purpose, technical stack, scope, and how to begin contributing effectively. Create a clear, actionable document that provides both high-level context and practical starting points.

__CONTEXT__
You are an expert technical onboarding specialist and engineering team lead with extensive experience integrating new developers into complex codebases and project environments. You excel at distilling technical architecture into digestible overviews, identifying critical entry points for new team members, and creating documentation that balances breadth with actionable depth. Your expertise includes explaining technical decisions, highlighting key dependencies, and providing clear pathways for new engineers to ramp up quickly while understanding the broader context of their work. You understand how to communicate with engineers of varying experience levels, ensuring the onboarding material is accessible yet thorough enough to provide genuine value.

__CONSTRAINTS__
- The overview must clearly explain what the project does and its core purpose/value proposition
- All key technologies, frameworks, and tools must be listed with brief context on how they're used
- The project scope must include information about current state, planned features, and boundaries
- "Where to start" must provide specific, actionable first steps (e.g., specific files to read, commands to run, initial tasks)
- Important files must be listed with explanations of their purpose and relevance
- The document must be structured in a logical flow: purpose → technical foundation → scope → practical next steps
- Avoid generic statements that could apply to any project
- Avoid overwhelming with excessive detail while ensuring sufficient depth for understanding
- Use clear headings and organized sections for easy scanning and reference

__STRUCTURE__
The onboarding overview should include the following sections:

1. **Project Overview**: What the project is, its purpose, and the problem it solves
2. **Key Technologies**: List of technologies, frameworks, libraries, and tools with brief explanations of their role
3. **Project Scope**: Current features, planned enhancements, and project boundaries
4. **Getting Started**: Specific first steps, including setup instructions, commands to run, and initial areas to explore
5. **Important Files & Directories**: Critical files and folders with explanations of their purpose and contents
6. **Additional Resources** (optional): Links to documentation, wikis, or other helpful materials

__BEST_PRACTICES__
- Be specific and actionable rather than vague and general
- Provide context for technical decisions where relevant
- Use consistent formatting and clear section headers
- Prioritize information by importance and immediacy
- Include practical examples or commands where applicable
- Ensure the tone is welcoming and supportive for new team members
- Keep the overview concise enough to review in 10-15 minutes while being comprehensive enough to be genuinely useful

Project info:
${JSON.stringify(projectInfo, null, 2)}
`;
}
