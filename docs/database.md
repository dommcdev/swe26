# Updating Sqlite Database

## 📦 Generate Migrations

When you modify `schema.ts`, generate the migration SQL files:

```bash
bun run db:generate
```

**What it does:** Creates SQL "instruction" files in `/drizzle/` based on schema changes.

---

## 🚀 Apply Migrations

Apply all pending migrations to update `sqlite.db`:

```bash
bun run db:migrate
```

**What it does:** Executes all SQL files in `/drizzle/` to sync `sqlite.db` with `schema.ts`.

---

## 👀 View Database

Launch Drizzle Studio to browse and inspect your data:

```bash
bun run db:studio
```

**What it does:** Opens a web interface to view and manage `sqlite.db` contents.

---

## 🔥 YOLO

Quickly test out a new version of `schemea.ts`:

```bash
bun run db:push
```

**What it does:** Makes `sqlite.db` match `schema.ts` immediately, skipping the migration steps.

---
