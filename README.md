# Serverless Webservice API Demo Suite

An API with nine endpoints to be used as examples or for tests. 

The root endpoint will list examples. Ball, Games, UMWUG, ELUNA, and Weather endpoints can be used as coding examples. Echo and Test can be used as tests. Echo can invoke specific responses including HTTP status and body values to test against your code. Test endpoint can be extended to return any test data you wish.

Ready to be deployed as a CloudFormation stack using the Atlantis CI/CD Pipeline or on its own.

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

`https://{{api-gateway-execute-domain.aws.amaon.com}}/{{stage}}`

For example, the Ball endpoint would be:

`https://{{api-gateway-execute-domain.aws.amaon.com}}/{{stage}}/ball`

And the Games endpoint would be:

`https://{{api-gateway-execute-domain.aws.amaon.com}}/{{stage}}/games`

All endpoints return `Content-Type: application/json` unless otherwise noted. A complete reference may be found in the swagger.yml document or downloaded from API Gateway.

### Root

`/`

Provides a JSON object of all the endpoints and examples.

### 8 Ball

`/ball`

