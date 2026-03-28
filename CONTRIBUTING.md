# Contributing to MBA Lite

Thank you for your interest in contributing to MBA Lite. This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and harassment-free environment for everyone. We are committed to providing a welcoming community for all.

## How to Contribute

### Reporting Bugs

1. Check the [existing issues](https://github.com/your-org/mba-lite/issues) to see if the bug has already been reported.
2. If not, open a new issue using the **Bug Report** template.
3. Include steps to reproduce, expected behavior, actual behavior, and environment details.

### Suggesting Features

1. Open a new issue using the **Feature Request** template.
2. Describe the user problem, the proposed solution, and any alternatives you've considered.
3. If the feature relates to curriculum content, tag it with the `content` label.

### Submitting Code Changes

#### Setup

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mba-lite.git
cd mba-lite

# Add upstream remote
git remote add upstream https://github.com/your-org/mba-lite.git

# Install dependencies
npm install

# Set up local database
docker compose up -d postgres
cp .env.example .env.local
npx prisma migrate dev

# Start dev server
npm run dev

# Create a branch
git checkout -b feature/your-feature-name
```

#### Branch Naming

- `feature/` — New features (e.g., `feature/ai-tutor-voice-mode`)
- `fix/` — Bug fixes (e.g., `fix/streak-counter-reset`)
- `docs/` — Documentation changes (e.g., `docs/update-api-reference`)
- `refactor/` — Code refactoring (e.g., `refactor/srs-engine`)
- `test/` — Test additions or fixes (e.g., `test/knowledge-check-scoring`)

#### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

**Examples:**
```
feat(ai-tutor): add Socratic questioning mode
fix(srs): correct interval calculation for review cards
docs(prd): update AI Management module descriptions
test(api): add integration tests for /today endpoint
```

#### Pull Request Process

1. Ensure all tests pass: `npm test`
2. Ensure linting passes: `npm run lint`
3. Ensure type checking passes: `npm run typecheck`
4. Ensure the build succeeds: `npm run build`
5. Update documentation if your change affects APIs, architecture, or user-facing behavior.
6. Open a PR against `main` using the PR template.
7. Request review from at least one code owner.
8. Address all review feedback.
9. Squash and merge after approval.

### Contributing Content

If you want to contribute lesson content, case studies, or knowledge check questions:

1. Read the [Content Guide](docs/CONTENT_GUIDE.md) for style, formatting, and quality standards.
2. Open an issue describing the content you want to add.
3. Submit content as a PR with files in the `content/` directory.
4. All content must be original work based on publicly available information.
5. Content PRs require review from both an engineer and a subject matter expert.

**Important:** Never submit copyrighted material from HBS Publishing, INSEAD case studies, or any proprietary source. All case studies must be original analyses.

## Development Guidelines

### Code Style

- TypeScript for all new code
- ESLint + Prettier enforced via pre-commit hooks
- Functional components with hooks (React/React Native)
- Named exports preferred over default exports
- Comprehensive JSDoc for public APIs

### Testing

- Unit tests for business logic (Jest)
- Integration tests for API routes (Jest + Next.js test utils)
- E2E tests for critical user flows (Playwright)
- Minimum 80% code coverage for new code

### Database Changes

- All schema changes via Prisma migrations (`npx prisma migrate dev --name your_change`)
- Update `prisma/schema.prisma` first, then generate migration
- Test migrations locally before pushing
- Include seed data updates if new tables/columns are added

## Questions?

Open a [Discussion](https://github.com/your-org/mba-lite/discussions) for general questions or reach out to the maintainers.
