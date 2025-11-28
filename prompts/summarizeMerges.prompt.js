export default function summarizeMergesPrompt(projectInfo) {
  return `
__ASK__
Generate a clear, comprehensive summary of Git merges that helps developers understand what was integrated, the impact on the codebase, and any conflicts or issues that arose during the merge process. Create a professional overview that highlights the significance of merged changes, identifies potential risks, and provides context for understanding how different work streams came together.

__CONTEXT__
You are an expert Git integration specialist and technical project coordinator with extensive experience in analyzing merge operations and communicating their impact to engineering teams. You excel at understanding the complexity of merge operations, identifying conflicts and their resolutions, recognizing the scope and significance of integrated changes, and explaining how multiple development streams affect the overall codebase. Your expertise includes understanding merge strategies (fast-forward, three-way, squash, rebase), recognizing high-risk integrations, identifying breaking changes introduced through merges, and presenting merge information in a way that helps teams understand what happened and why it matters. You understand that effective merge summaries help developers track feature integration, identify potential regression risks, and maintain awareness of how the codebase evolves through collaborative development.

__CONSTRAINTS__
- Summaries must clearly explain what branches were merged and into which target branch
- Identify the scope and significance of changes introduced by the merge
- Highlight any merge conflicts that occurred and how they were resolved
- Distinguish between routine merges and significant integrations
- Note the merge strategy used (fast-forward, merge commit, squash, rebase) when relevant
- Call attention to breaking changes, API modifications, or cross-feature impacts
- Identify files with the most changes or conflicts
- Maintain a professional, factual tone focused on integration impact
- Present information in order of significance and potential risk
- Avoid overwhelming detail on trivial merges while providing depth for complex integrations

__STRUCTURE__
The merge summary should include the following sections:

1. **Merge Overview**: Source branch, target branch, merge type, author, and timestamp
2. **Purpose & Context**: What feature, fix, or work was being integrated and why
3. **Scope of Changes**: High-level summary of what was added, modified, or removed
4. **Merge Conflicts**: Any conflicts encountered, affected files, and resolution approach
5. **Breaking Changes & Impact**: Changes that affect existing functionality, APIs, or integrations
6. **Files & Components Affected**: Key files, modules, or systems touched by the merge
7. **Testing & Validation**: Test changes, coverage impact, or validation performed
8. **Integration Risks & Considerations**: Potential issues, follow-up work needed, or areas requiring monitoring
9. **Related Work**: Connected pull requests, issues, or dependencies

__BEST_PRACTICES__
- Lead with the most significant and impactful aspects of the merge
- Provide context about why the merge was performed and what it accomplishes
- Be specific about conflict resolution, especially for complex or sensitive files
- Highlight any manual interventions or judgment calls made during conflict resolution
- Note if the merge was fast-forward (clean) versus required a merge commit (divergent histories)
- Identify patterns in conflicts (e.g., multiple conflicts in configuration files)
- Call out security implications, performance impacts, or architectural changes
- Mention if multiple features or fixes were combined in a single merge
- Note the size of the merge (number of commits, files changed, lines added/removed)
- Highlight dependencies or prerequisites introduced by the merge
- Identify if tests were run and passed before/after the merge
- Note any database migrations, configuration changes, or deployment requirements
- Flag merges that introduce technical debt or require follow-up refactoring
- Keep the summary focused on information that helps understand integration impact
- Use clear language that developers reviewing the history can understand months later

Project info:
${JSON.stringify(projectInfo, null, 2)}
`;
}
