# ChopChop

The Digital Cookbook

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Install dependencies:

```bash
bun install
bun run docs:agents #install next.js docs for ai agents
```

2. Set up the database:

```bash
bun run db:migrate
```

3. Start the development server:

```bash
bun run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Available Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `bun run dev`         | Start the development server         |
| `bun run build`       | Build the production application     |
| `bun run start`       | Start the production server          |
| `bun run lint`        | Run ESLint                           |
| `bun run db:generate` | Generate database migrations         |
| `bun run db:migrate`  | Apply database migrations            |
| `bun run db:studio`   | Open Drizzle Studio to view database |
