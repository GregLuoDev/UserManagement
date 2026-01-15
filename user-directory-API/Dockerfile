FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["UserDirectory.WebAPI/UserDirectory.WebAPI.csproj","UserDirectory.WebAPI/"]
RUN dotnet restore "UserDirectory.WebAPI/UserDirectory.WebAPI.csproj"
COPY . .
WORKDIR "/src/UserDirectory.WebAPI"
RUN dotnet build "UserDirectory.WebAPI" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UserDirectory.WebAPI" -c Release -o /app/build


COPY ./UserDirectory.WebAPI/UserDirectory.WebAPI.csproj ./
RUN dotnet restore "UserDirectory.WebAPI/UserDirectory.WebAPI.csproj"
COPY . .
RUN dotnet publish ./UserDirectory.WebAPI/UserDirectory.WebAPI.csproj -c Release -o /app/

 

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final
WORKDIR /app
ENV DOTNET_URLS=http://+:5000
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MyWebApp.dll"]