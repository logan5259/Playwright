# Automated tests repository - Playwright

## Getting started

This repository contains automated tests in Playwright.

## Project structure

```

├── playwright
|   ├── e2e | contains automated tests
|   |   ├── exampleTest.spec.ts
|   ├── fixtures | contains fixtures for XYZ translations
|   |   ├── exampleFixture.json > fixture for contact forms in a particular language
|   ├── plugins
|   ├── commands | custome commands for automated tests
|   |   ├── exampleAssertionsCommands.ts > Custom commands for Solar Calculators assertions
|   |   ├── exampleFormCommands.ts > Custom commands of test activities in contact forms
|   |   ├──  e2e.ts > file for importing other files with Custom Commands
|   |   ├── generalCommands.ts > General commands e.g. login
|   ├── readme.md   * file contains information about the project
|   ├── .eslintrc.json > ESLint configuration file
|   ├── tsconfig.json > TypeScript configuration file
|
```

## Local test configuration

1. Copy env.example and rename to .env (by default it contains develop backend local frontend URLS)
2. Use command to install dependencies
 ```
    npm install
 ```
3. env.example configuration requires local frontend
   - Clone & run repository https://localRepositoryAddress


4. Run some tests in Playwright

```
    npx playwright test
```

or to use particular number of workers e.g. 4

```
    npx playwright test --workers 4
```

5. Test reports

```
    npx playwright test --reporter=html
```

```
    npx playwright show-report
```

## Additional information

To run the code in a Docker image on a pipeline, you need to set the environment variable env to "local". Changing the env variable to "dev" or "stg" will trigger testing using the frontend of the respective selected test environment.

### CI/CD piplines

TBD

## Test documentation

[Test documentaion](https://exampleUrl)
