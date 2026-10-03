# Bulk Email Scheduler

## Skill: Product Context
- A backend-oriented system for scheduling and sending bulk emails with rate control and error handling.
- The stated impact is more reliable delivery through queueing and explicit failure management.

## Skill: Architecture
- The project uses a producer-worker architecture with BullMQ and Redis.
- Its recorded flow is: job creation, queue persistence, worker processing, delivery tracking.
- The portfolio calls the design a worker-pool architecture and highlights persistent queue state.

## Skill: Technology Decisions
- Stack listed: Next.js 14, TypeScript, BullMQ, Redis, PostgreSQL, and Prisma.
- BullMQ is documented as the choice for retry logic and delayed jobs needed by transactional email workflows.
- Rate limiting and throttling address SMTP-provider constraints.

## Skill: Product Capabilities
- Persistent background jobs and scheduled delivery.
- Rate limiting, throttling, retry handling, and a Dead Letter Queue handler.
- Realtime job monitoring, delivery history, and operational logs.

## Skill: Engineering Challenges
- The project record identifies SMTP provider limits and failed delivery attempts as key operational concerns.
- It records a Dead Letter Queue handler for graceful management of failed attempts.
- No delivery volume, throughput, or recovery-time figures are documented.

## Skill: Interview Angles
- Explain why durable queue state is useful when a web process restarts.
- Discuss retry policy, idempotency, and when an email job should move to a dead-letter path.
- Describe how throttling protects the system from exceeding provider limits.