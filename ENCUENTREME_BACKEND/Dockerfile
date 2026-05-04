# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["Encuentreme.API/Encuentreme.API.csproj", "Encuentreme.API/"]
COPY ["Encuentreme.Data/Encuentreme.Data.csproj", "Encuentreme.Data/"]
COPY ["Encuentreme.Entities/Encuentreme.Entities.csproj", "Encuentreme.Entities/"]
COPY ["Encuentreme.Framework/Encuentreme.Framework.csproj", "Encuentreme.Framework/"]
COPY ["Encuentreme.Logic/Encuentreme.Logic.csproj", "Encuentreme.Logic/"]
RUN dotnet restore "Encuentreme.API/Encuentreme.API.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/Encuentreme.API"
RUN dotnet build "Encuentreme.API.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "Encuentreme.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Environment variables for Render
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Encuentreme.API.dll"]
