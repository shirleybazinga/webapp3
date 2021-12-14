# Web App

This is a Web App with a login page and a functional page that can only access after login.

## Usage

### Run the frontend:
```bash
cd ClientApp
yarn install
yarn build
cd ..
```
#### Windows:
```
robocopy ClientApp/build/ webapp3/wwwroot /s
```
#### Linux:
```
cp -r ClientApp/build/* webapp3/wwwroot
```

### Run the backend:
```bash
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d --no-build --force-recreate --remove-orphans
```

For Linux, you may need to run the above docker-compose commands as root or use "sudo"

Alternative way to run the backend (with Visual Studio):
1. Use Visual Studio to open solution file webapp3.sln
2. Set Solution Configurations to "Release"
3. Set Startup Projects to "docker-compose"
4. Run "Start Without Debugging"

### Launch the application:
From browser, go to https://localhost

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
