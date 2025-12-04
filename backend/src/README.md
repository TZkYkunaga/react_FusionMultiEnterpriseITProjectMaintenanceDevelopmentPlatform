# Backend Source

This folder holds the `Fusion.API` ASP.NET Core sources.

Quick structure

- `Data/` - `ApplicationDbContext`, `SeedData`, and migrations when present.
- `Models/` - Entity classes used by EF.
- `Controllers/` - API endpoints.
- `Middleware/` - custom middleware registered in `Program.cs`.

Tips
- If you edit the EF model and want migration-based updates, run `dotnet ef migrations add <Name>` and `dotnet ef database update` (requires .NET SDK installed).
