# BestPlaces web application

Find best places around

### Prerequisites:
- App is developed with node 15.0.1, but couple of latest major LTS versions should do fine
- The environment should contain these variables:

    ```
        API_URL=your_backend_api
        GOOGLE_API_KEY=your_google_maps_key
    ```
- For development purposes, create `.env` file in the root of your project and add variables mentioned above to it

### Installation:
- Simple `npm install` should do the trick.

- In case that installer is complaining about being unable to resolve dependency tree, try appending npm install with `--force` flag

### Running:
- To run the app locally, one should simply do `npm start` after successfully completed steps mentioned above.

### Production build:
- To create a production-ready build, execute `npm run build`, it will create `dist/` directory in the root of your project with minimized files.

### Linting:
- To run linter, execute the command: `npm run lint`
