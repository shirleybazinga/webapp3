# Web App

This is a Web App with a login page and a functional page that can only access after login.

## Usage

Run the application:
```bash
cd ClientApp
yarn build
robocopy build/ ../wwwroot
cd ..
docker-compose -f docker-compose.yml -f docker-compose.override.yml --no-ansi build
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f obj\Docker\docker-compose.vs.release.g.yml --no-ansi up -d --no-build --force-recreate --remove-orphans
```

Launch the application:
From browser, go to https://localhost

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
