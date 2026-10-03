# CareerPath AI

## Skill: Product Context
- An AI-powered career planning platform that helps users map skills and find learning paths.
- The project is described as a full-stack career intelligence tool with personalized recommendations and progress tracking.
- Its stated impact is to simplify career decisions with data-driven recommendations.

## Skill: Architecture
- The portfolio describes a modular monolith with separation between the Express API and a reasoning layer.
- The recorded user flow is: user input, assessment engine, recommendation logic, progress dashboard.
- Learner-facing and administrator-facing views are both part of the product.

## Skill: Technology Decisions
- Stack listed in the project record: React 19, Vite, Node.js, Express, MongoDB, Groq Llama, Razorpay, and OAuth 2.0.
- The recorded rationale says React 19 was selected to keep the AI chat interface responsive during data processing.
- The AI integration note lists Groq Llama 3 for career-path generation and Gemini API for multimodal document analysis.

## Skill: Product Capabilities
- Dynamic skill assessment engine.
- Personalized roadmap generation.
- Progress dashboard and administrator analytics dashboard.
- Payment and authentication integration.

## Skill: Engineering Challenges
- The project record says prompt-caching strategies were used to reduce Groq Llama inference latency.
- It also records state-desynchronization issues in the multi-step assessment flow and a global state manager as the solution.
- Do not claim measured latency improvements; no benchmark figures are documented.

## Skill: Interview Angles
- Discuss how the assessment input becomes a recommendation and then a trackable roadmap.
- Explain why learner and administrator workflows need different views.
- Discuss the boundary between deterministic assessment logic and generated AI recommendations.