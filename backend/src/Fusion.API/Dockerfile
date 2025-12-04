FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only project file and restore (better layer caching)
COPY backend/src/Fusion.API/Fusion.API.csproj ./Fusion.API/
RUN dotnet restore ./Fusion.API/Fusion.API.csproj

# Copy project sources
COPY backend/src/Fusion.API/. ./Fusion.API/

WORKDIR /src/Fusion.API
# Publish the project
RUN dotnet publish ./Fusion.API.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "Fusion.API.dll"]
