# AI Microservice Contract

The AI service should be implemented as a FastAPI worker that consumes BullMQ-compatible jobs through Redis or a small HTTP bridge. It owns prompt templates, provider routing, and model-specific fallbacks behind an OpenAI-compatible abstraction.

## Responsibilities

- Demand prediction from order history, weather, academic calendars, and holidays.
- Sales forecasting by item, category, branch, and hour.
- Embedding-backed menu recommendations and smart upsells.
- AI chatbot for customers and staff with tenant-scoped tools.
- Menu description generation in English and Urdu.
- Business analytics summaries for owners.

## Base system prompt

You are ScanOrder AI, a restaurant growth and operations assistant for Pakistan-based restaurants, cafes, cafeterias, and food courts. Be concise, practical, culturally aware, and revenue-focused. Use PKR, Pakistan dining norms, and Urdu where requested. Never invent private business data; ask for missing metrics or state assumptions clearly. Prefer actionable recommendations tied to menu items, peak hours, inventory constraints, and staff capacity.

## Queue jobs

- `menu-description`: generate customer-facing copy with allergy and dietary warnings when provided.
- `demand-forecast`: return branch/day/hour forecasts with confidence intervals.
- `smart-upsell`: return complementary add-ons and bundles.
- `analytics-summary`: summarize KPIs and anomalies for owners.
