# Serverless Webservice API Demo Suite

> This project has been replaced by the [Atlantis CloudFormation Template Repository](https://github.com/63Klabs/atlantis-cfn-template-repo-for-serverless-deployments), [Atlantis SAM Configuration Repository](https://github.com/63Klabs/atlantis-cfn-configuration-repo-for-serverless-deployments), and [starter applications and tutorials](https://github.com/63Klabs/atlantis-tutorials) available from my [63Klabs](https://github.com/63klabs) projects.
> 
An API with nine endpoints to be used as learning examples or for tests. 

The root endpoint will list examples. Ball, Games, UMWUG, ELUNA, and Weather endpoints can be used as coding examples. Echo and Test can be used as tests. Echo can invoke specific responses including HTTP status and body values to test against your code. Test endpoint can be extended to return any test data you wish.

Ready to be deployed as a CloudFormation stack using the Atlantis CI/CD Pipeline or on its own.

It is recommend that you have some understanding of CloudFormation, API Gateway, and Lambda before installing.

## Endpoints

- Root
- 8Ball
- Games
- UMWUG
- ELUNA
- Weather (requires  Weather API Key)
- Echo
- Test

Once installed you will need to find your API Gateway URL and stage for the complete domain and path to the endpoints.

The endpoints listed below will have the following root domain and path: 

`https://{{api-gateway-execute-domain.amazonaws.com}}/{{stage}}`

For example, the Ball endpoint would be:

`https://{{api-gateway-execute-domain.amazonaws.com}}/{{stage}}/ball`

And the Games endpoint would be:

`https://{{api-gateway-execute-domain.amazonaws.com}}/{{stage}}/games`

All endpoints return `Content-Type: application/json` unless otherwise noted. A complete reference may be found in the swagger.yml document or downloaded from API Gateway.

### Root

Provides a JSON object of all the endpoints and examples in addition to the ones below.

Endpoint: `/`

### 8 Ball

Provides a prediction to a yes/no question, lucky numbers, and certainty of the prediction/lucky number. (For entertainment purposes only)

Can be used as an example API and incorporated into sample code.

Request prediction, numbers, and certainty: `/8ball`

Request a prediction only: `/8ball?code=prediction`

The code parameter may also be set to `certainty` or `luckynumbers` to return only those data points.

### Games

Provides a list of games.

Can be used as an example API and incorporated into sample code.

Request a full list of all game choices (including hidden ones): `/games`

Request a list of game choices: `/games?code=list`

Request a random game: `/games?code=random`

### UMWUG

Examples given at an UMWUG conference presentation.

`/umwug`

`/umwug?code=BAO`

The `code` parameter may also be set to: `CBL`, `LVP`, `CPE`, `DEV`, `DOC`, `LNF`, `GIT`, `BNS`

### ELUNA

Examples given at an ELUNA conference presentation.

`/eluna`

`/eluna?code=BAO`

The `code` parameter may also be set to: `CBL`, `LVP`, `CPE`, `DEV`, `DOC`, `LNF`, `GIT`, `BNS`, `8BL`

### Weather

`/weather`

You will need to create an account at Open Weather Map and generate an API Key. 

Then store the API Key in Parameter Store for each deployment. For example, here is the SSM Parameter Store location for the beta stage deployment: `/projectstack-api-demo-suite-beta/apikey_weather`

### Echo

Echoes back a requested response.

Do you need to test your code's processing of a 304? 301? 500? Or other response? Tell the echo endpoint what you need and it will send it back as a response.

Request a response with information about the request: `/echo`

Request a response with a 418 HTTP status code `/echo?status=418`

Any valid status code may be submitted via the `status` parameter in the query string to receive that response. `301` or `302` will respond with a redirect and depending on your client's settings will either display redirect information or perform the redirect.

If the `If-None-Match` header is provided, an `etag` parameter may be sent in the query string to force a `304` (Etag the same, not modified) or `200` (Etag does not match, modified) response. The `etag` parameter tells the server what it should evaluate the client provided `If-None-Match` header against.

If the `If-Modified-Since` header is provided, a `lastmodified` parameter may be sent in the query string to force a `304` (not modified since) or `200` (modified since) response. The `lastmodified` parameter tells the server what it should evaluate the client provided `If-Modified-Since` header against.

You can also send a `POST` request with a body containing the data you wish to have returned. It will detect if it is TEXT/HTML or JSON and return the appropriate content type.

### Test

Return all test data: `/test`

#### Test Posts

All posts: `/test?data=posts`

Single post with ID: `/test?data=posts&id=123003`

#### Test Books

All books: `/test?data=books`

Single book with ID: `/test?data=books&id=1234567-001`

Single book with ISBN: `/test?data=books&isbn=1000000002`

#### Test Employees

All employees: `/test?data=employees`

Single employee with ID: `/test?data=employees&id=100000001`

## Installation

Atlantis is a CloudFormation template that produces a CodePipeline. This application is already set up to work with the pipeline.

1. Place this code in an AWS CodeCommit repository.
2. Create a CloudFormation stack for the pipeline using [Serverless Deploy Pipeline Atlantis](https://github.com/chadkluck/serverless-deploy-pipeline-atlantis) and point it to the repository.
3. Once the pipeline is set up, it will find the code and deploy the application's infrastructure stack.
