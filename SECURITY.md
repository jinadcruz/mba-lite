# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in MBA Lite, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, email **security@mbalite.app** with:

1. A description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Any suggested fixes (optional)

We will acknowledge receipt within 48 hours and provide a timeline for resolution. We aim to patch critical vulnerabilities within 72 hours.

## Supported Versions

| Version | Supported |
|---|---|
| Latest release | Yes |
| Previous minor | Security patches only |
| Older | No |

## Security Practices

- All dependencies are audited weekly via `npm audit` and Dependabot
- Secrets are managed via environment variables and never committed to source control
- All API endpoints require authentication except public marketing pages
- AI tutor conversations are encrypted at rest
- Annual third-party penetration testing
- SOC 2 Type II compliance planned within 12 months of production launch

## Scope

The following are in scope for security reports:

- The MBA Lite web application
- The MBA Lite mobile application
- The MBA Lite API
- Authentication and authorization flows
- Payment processing
- AI tutor data handling

The following are out of scope:

- Third-party services (Stripe, Anthropic, AWS) — report to those providers directly
- Social engineering attacks
- Denial of service attacks
