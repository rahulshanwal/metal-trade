This project is built as a part of the Full Stack Program for the Metallica assignment.
The running app can be checked at the below location :
[Metallica - metal trading](https://shielded-bayou-75551.herokuapp.com/)

## Table of Contents
- [Folder Structure](#folder-structure)
- [High level Architecture](#high-level-architecture)
- [Technology Stack](#technology-stack)

## Folder Structure
**UI**: Contains the UI side project build on React/redux
- 'src' - src folder containes the source for all the js/html/css files
  - 'components' - contains the custom stateless components used in the app.
  - 'conatainers' - contains the custom containers holding some state used in the app.
  - 'hoc' - higher order components
  - 'Store' - the Redux store - holding actions and reducers acting as models for the app


**metallica-backend**: Contains the backend side code build using node. API gateway/proxy and authentication is handled here


**tradeServices**: microservice for the trade actions. To change add/edit/delete trades.

**refdataServices**: microservice to handle the static data for counterparty, location, side and commodity.

**marketDataServices**: microservice to feed the market data for different metals. here I have kept the data in a js file and changing it every 10 seconds to feed to the tickr.

**notificationServices**: microservice to consume all the message from amqp queues and send notification to UI via websockets.


## High Level Architecture
All the requests from the frontend are routed through the API gateway, the authentication happens here and then the calls are routed to the appropriate microservices. These microservices then publishes the event on the message broker which are then picked up by the notification services to be fed to the frontend via the websockets.
Each microservices has its own db


## Technology Stack

**Front End**
- ES6
- React
- Redux
- Material UI

**API Gateway**
- http-proxy-middleware (node module)

**Authentication** 
- passport (node module)
- passport-jwt (node module)

**Microservices**
- Node.js

**Messaging Infrastructure**
- amqplib (node module for rabitmq)

**Streaming**
- socket.io (websockets)

**Database**
- MongoDB
