# Modern Portfolio

## Skill: Product Context
- An interactive developer portfolio designed to present projects through motion, case studies, and live previews.
- The project is the current portfolio build and emphasizes responsive presentation and fast project interaction.

## Skill: Architecture
- Built with React 19, TypeScript, and Vite, with reusable project presentation and case-study components.
- The portfolio record describes scroll-linked motion, automated previews, and a mechanical drawer interaction for project details.
- Its recorded flow is: kinetic gallery, scroll-linked motion, live viewports, automated previews.

## Skill: Technology Decisions
- Stack listed: React 19, Framer Motion, TypeScript, Tailwind CSS, Vite, and Lucide React.
- Framer Motion powers scroll-linked animation and spring-physics interactions.
- Project preview iframes load on demand, according to the portfolio's project notes.

## Skill: Product Capabilities
- Responsive project gallery and case-study details.
- Screenshot carousels and live project previews.
- Animated navigation, scroll-linked effects, and a custom cursor.

## Skill: Engineering Challenges
- The project record highlights a dual-layer spring-physics cursor system.
- On-demand iframe loading is used to avoid loading every live preview immediately.
- No measured bundle-size, performance, or accessibility audit results are documented here.

## Skill: Interview Angles
- Explain how deferred iframe loading balances discoverability and page cost.
- Discuss animation performance and the trade-offs of custom cursor effects.
- Describe how project data and reusable case-study presentation keep the gallery consistent.