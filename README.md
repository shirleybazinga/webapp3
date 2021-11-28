# Web App

This is a Web App with a login page and a functional page that can only access after login.

## Usage

Running the frontend:
```bash
cd ClientApp
yarn build
```
Copy the ClientApp/build/* files to webapp3/wwwroot

Running the backend:
- Method 1: With Visual Studio
1. Use visual studio to open solution file webapp3.sln
2. Set docker-compose to be the startup project.
3. Pick Solution Configurations to be "Release"
4. Run "Start Without Debugging"

Launching the application:
From browser, go to https://localhost/index.html

Or
- Method 2: With docker-compose
docker-compose  -f "D:\doc\workspace\wa3\docker-compose.yml" -f "D:\doc\workspace\wa3\docker-compose.override.yml" -f "D:\doc\workspace\wa3\obj\Docker\docker-compose.vs.release.g.yml" -p webapp3 --ansi never config
docker-compose  -f "D:\doc\workspace\wa3\docker-compose.yml" -f "D:\doc\workspace\wa3\docker-compose.override.yml" -p webapp3 --ansi never build
docker-compose  -f "D:\doc\workspace\wa3\docker-compose.yml" -f "D:\doc\workspace\wa3\docker-compose.override.yml" -f "D:\doc\workspace\wa3\obj\Docker\docker-compose.vs.release.g.yml" -p webapp3 --ansi never up -d --no-build
docker exec -i -e ASPNETCORE_HTTPS_PORT="443" webapp3 sh -c ""dotnet"  --additionalProbingPath /root/.nuget/packages --additionalProbingPath /root/.nuget/fallbackpackages  "/app/webapp3.dll" | tee /dev/console"

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.