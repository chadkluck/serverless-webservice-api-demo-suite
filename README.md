# Serverless Webservice API Demo Suite

An API with nine endpoints to be used as learning examples or for tests. 

The root endpoint will list examples. Ball, Games, UMWUG, ELUNA, and Weather endpoints can be used as coding examples. Echo and Test can be used as tests. Echo can invoke specific responses including HTTP status and body values to test against your code. Test endpoint can be extended to return any test data you wish.

Ready to be deployed as a CloudFormation stack using the Atlantis CI/CD Pipeline or on its own.

It is recommend that you have some understanding of CloudFormation, API Gateway, and Lambda before installing.

## Endpoints

- Root
- Ball
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

Provides a prediction to a yes/no question, lucky numbers, and certainty of the prediction/lucky number.

Can be used as an example API and incorporated into sample code.

Request prediction, numbers, and certainty: `/ball`

Request a prediction only: `/ball?code=prediction`

The code parameter may also be set to `certainty` or `luckynumbers` to return only those.

### Games

Provides a list of games.

Can be used as an example API and incorporated into sample code.

Request a full list of all game choices (including hidden ones): `/games`

Request a list of game choices: `/games?code=list`

Request a random game: `/games?code=random`

### UMWUG

Examples given at an UMWUG conference presentation.

`/umwug`

### ELUNA

Examples given at an ELUNA conference presentation.

`/eluna`

### Weather

`/weather`

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

`/test`

## Installation