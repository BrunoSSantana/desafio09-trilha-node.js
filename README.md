# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

<!-- This project contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/todo` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/todo/schema.ts` JSON-Schema definition: it must contain the `name` property. -->

- requesting any other path than `/todo/{id}` with any other method than `POST` and `GET` will result in API Gateway returning a `404` HTTP error code
- sending a `POST` request to `/todo/{id}` with a payload **not** containing a string properties named `title` and `deadline`, will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/todo/{id}` with a payload containing a string properties named `title` and `deadline`, will result in API Gateway returning a `200` HTTP status code with a message: `"Todo created!"`

### Locally

In order to test the todo function locally, run the following command:

- `yarn dev` start serverless
- `serverless dynamodb install` install dynamobd
- `yarn dynamo:start` start dynamobd

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/todo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
????????? src
???   ????????? functions               # Lambda configuration and source code files
???   ???   ????????? addTodo.ts          # `todo` lambda source code
???   ???   ????????? findTodosByUser.ts  # `todo` lambda source code
???   ???   ???
???   ???   ????????? index.ts            # Import/export of all lambda configurations
???   ???
???   ????????? libs                    # Lambda shared code
???       ????????? apiGateway.ts       # API Gateway specific helpers
???       ????????? handlerResolver.ts  # Sharable library for resolving lambda handlers
???       ????????? lambda.ts           # Lambda middleware
???
????????? package.json
????????? serverless.ts               # Serverless service file
????????? tsconfig.json               # Typescript compiler configuration
????????? tsconfig.paths.json         # Typescript paths
????????? webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
