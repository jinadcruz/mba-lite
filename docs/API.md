# API Documentation — MBA Lite

**Base URL:** `https://api.mbalite.app/v1`
**Authentication:** Bearer token (JWT) in the `Authorization` header.

## Authentication

### POST `/auth/register`
Register a new user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Priya Nair",
  "timezone": "Asia/Kolkata"
}
```

**Response (201):**
```json
{
  "user": { "id": "usr_abc123", "email": "user@example.com", "name": "Priya Nair" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST `/auth/login`
Authenticate and receive a JWT.

### POST `/auth/oauth`
Authenticate via Google or Apple OAuth. Accepts an OAuth token and provider identifier.

## Daily Lesson

### GET `/today`
Returns today's lesson and any pending review cards for the authenticated user.

**Response (200):**
```json
{
  "lesson": {
    "id": "les_001",
    "module_id": "mod_fin_acct",
    "title": "Understanding the Balance Sheet",
    "order": 3,
    "concept": { "content": "...", "diagrams": ["https://cdn.mbalite.app/..."] },
    "case_study": { "title": "How Jio Built a Balance Sheet for Disruption", "content": "...", "company": "Reliance Jio", "geography": "India" },
    "knowledge_check": { "questions": [...] }
  },
  "review_cards": [
    { "id": "rc_042", "question": "What is the accounting equation?", "lesson_id": "les_001" }
  ],
  "streak": { "current": 14, "longest": 21 }
}
```

## Modules & Curriculum

### GET `/modules`
Returns the full curriculum map with user progress.

**Response (200):**
```json
{
  "core": [
    { "id": "mod_fin_acct", "title": "Financial Accounting", "lessons_total": 25, "lessons_completed": 3, "status": "in_progress" },
    { "id": "mod_corp_fin", "title": "Corporate Finance", "lessons_total": 25, "lessons_completed": 0, "status": "locked", "prerequisite": "mod_fin_acct" }
  ],
  "ai_management": [
    { "id": "mod_ai_strategy", "title": "AI Strategy & Competitive Dynamics", "lessons_total": 20, "lessons_completed": 0, "status": "available" }
  ]
}
```

### GET `/modules/:id/lessons`
Returns all lessons for a module with completion status.

## Lesson Completion

### POST `/lessons/:id/complete`
Marks a lesson as complete and records the knowledge check score.

**Request Body:**
```json
{
  "knowledge_check_score": 4,
  "knowledge_check_total": 5,
  "time_spent_seconds": 720
}
```

**Response (200):**
```json
{
  "completed": true,
  "score": 80,
  "streak_updated": true,
  "new_streak": 15,
  "badge_earned": null,
  "next_lesson_id": "les_004"
}
```

## AI Tutor

### POST `/tutor/message`
Send a message to the AI tutor. Supports streaming via Server-Sent Events.

**Request Body:**
```json
{
  "message": "Can you explain DCF valuation in simpler terms?",
  "context": "lesson",
  "lesson_id": "les_012",
  "conversation_id": "conv_abc123"
}
```

**Response (200, streamed):**
Server-Sent Events stream with the tutor's response, followed by a final event with the complete message and conversation metadata.

### GET `/tutor/history`
Returns paginated conversation history.

**Query Parameters:** `page` (default 1), `per_page` (default 20), `conversation_id` (optional).

## Case Study Library

### GET `/library/search`
Full-text search over the case study library.

**Query Parameters:**
- `q` — Search query (required)
- `geography` — Filter by geography (optional)
- `industry` — Filter by industry (optional)
- `framework` — Filter by MBA framework (optional)
- `difficulty` — Filter by difficulty level (optional)
- `page`, `per_page` — Pagination

**Response (200):**
```json
{
  "results": [
    { "id": "cs_042", "title": "M-Pesa: Mobile Money Revolution", "company": "Safaricom", "geography": "Kenya", "industry": "Fintech", "frameworks": ["Operations", "Financial Inclusion"], "snippet": "..." }
  ],
  "total": 142,
  "page": 1,
  "per_page": 20
}
```

### GET `/library/:id`
Returns the full case study content.

## Spaced Repetition

### POST `/review/submit`
Submit a review card response.

**Request Body:**
```json
{
  "card_id": "rc_042",
  "confidence": "medium"
}
```

Confidence values: `easy`, `medium`, `hard`. The SRS engine adjusts the next review interval accordingly.

## Progress & Stats

### GET `/progress/stats`
Returns the user's aggregate progress statistics.

**Response (200):**
```json
{
  "modules_completed": 1,
  "modules_total": 17,
  "lessons_completed": 45,
  "lessons_total": 380,
  "current_streak": 15,
  "longest_streak": 21,
  "average_score": 82,
  "review_cards_due": 3,
  "certificates": []
}
```

## Subscription

### POST `/subscription/create`
Creates a Stripe Checkout session for subscription.

### POST `/subscription/webhook`
Stripe webhook endpoint for subscription lifecycle events.

### GET `/subscription/status`
Returns current subscription status and plan details.

## Error Format

All errors follow a consistent format:

```json
{
  "error": {
    "code": "LESSON_NOT_FOUND",
    "message": "The requested lesson does not exist.",
    "status": 404
  }
}
```

## Rate Limits

| Tier | Requests/Minute | AI Tutor Messages/Day |
|---|---|---|
| Free | 60 | 3 |
| Subscriber | 120 | Unlimited |
| Enterprise | 300 | Unlimited |

Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
