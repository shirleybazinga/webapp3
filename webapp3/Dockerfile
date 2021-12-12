#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["webapp3/webapp3.csproj", "webapp3/"]
RUN dotnet restore "webapp3/webapp3.csproj"
COPY . .
WORKDIR "/src/webapp3"
RUN dotnet build "webapp3.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet dev-certs https
RUN dotnet publish "webapp3.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /root/.dotnet/corefx/cryptography/x509stores/my /root/.dotnet/corefx/cryptography/x509stores/my
COPY --from=publish /app/publish .
ENV ASPNETCORE_HTTPS_PORT=443
ENV ASPNETCORE_URLS="https://+:443"
ENTRYPOINT ["dotnet", "webapp3.dll"]
