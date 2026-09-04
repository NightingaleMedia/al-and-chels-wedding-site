# RSVP Feature Spec

## Overview

Build a complete guest RSVP system that allows wedding guests to search for themselves, view their party details, and submit attendance/meal selections to the external wedding backend.

## High-Level Goals

1. **Bridge frontend and backend** — Create type-safe server actions that communicate with the external wedding API via Next.js server actions.

2. **Define data contracts** — Establish TypeScript interfaces and Zod schemas that align requests/responses to the wedding backend's API endpoints.

3. **Provide guest search** — Allow guests to find their party by name, returning relevant party and guest information.

4. **Enable RSVP submission** — Let guests confirm attendance and select meal preferences, persisting choices to the backend.

5. **Build guest-facing form** — Create an intuitive, mobile-first form that guides guests through search → party review → RSVP submission.

## Sub-Specs

- **[0011-rsvp-server-actions](./0011-rsvp-server-actions/spec.md)** — Define server action file layout, method signatures, and request/response interface shapes
- **[0012-rsvp-types](./0012-rsvp-types/spec.md)** — Generate TypeScript interfaces and Zod schemas from API contracts
- **[0013-rsvp-client-form](./0013-rsvp-client-form/spec.md)** — Build the guest-facing RSVP form UI
