FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
# Create SQLite directory
RUN mkdir -p /app/data

EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["UserDirectory.WebAPI/UserDirectory.WebAPI.csproj","UserDirectory.WebAPI/"]
RUN dotnet restore "UserDirectory.WebAPI/UserDirectory.WebAPI.csproj"
COPY . .
WORKDIR "/src/UserDirectory.WebAPI"
RUN dotnet build "UserDirectory.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UserDirectory.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UserDirectory.WebAPI.dll"]

