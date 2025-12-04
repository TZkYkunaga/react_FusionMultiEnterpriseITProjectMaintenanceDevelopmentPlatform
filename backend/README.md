# Backend (ASP.NET Core)

This folder contains the backend API for the Fusion platform (ASP.NET Core + Entity Framework).

Top-level layout

- `backend/src/Fusion.API/` - ASP.NET Core Web API project
  - `Controllers/` - Web API controllers
  - `Data/` - EF DbContext, seeding and migrations
  - `Models/` - Entity models (Admin, Tenant, AuditLog)
  - `Middleware/` - custom middleware such as audit logging

Notes
- Development is configured to use a local SQLite file (`fusion.db`) by default.
- For production, switch back to SQL Server or another server-grade DB and use EF migrations.
