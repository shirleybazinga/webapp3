# Web App

This is a Web App with a login page and a functional page that can only access after login.

## Usage

Run the application:
```bash
cd ClientApp
yarn build
robocopy build/ ../wwwroot
cd ..
dotnet build webapp3.sln -c release
docker-compose -f docker-compose.yml -f docker-compose.override.yml --no-ansi build
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f obj\Docker\docker-compose.vs.release.g.yml --no-ansi up -d --no-build --force-recreate --remove-orphans
docker exec -i -e ASPNETCORE_HTTPS_PORT="443" webapp3 sh -c ""dotnet" --additionalProbingPath /root/.nuget/packages --additionalProbingPath /root/.nuget/fallbackpackages "/app/webapp3.dll" | tee /dev/console"
```

Launch the application:
From browser, go to https://localhost/index.html

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
