# Microservice Demo
Microservices for Demo project (Webshop)

## Architecture

**Webshop** is composed of * microservices written in different
languages that talk to each other via events, REST API.

[![Architecture of
microservices](./architecture_.jpg)](./architecture_.jpg)


| Service                                              | Language      | Description                                                                                                                       |
| ---------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [frontend](./*)                                      | React.js      | Exposes an HTTP server to serve the website. Does not require signup/login and generates session IDs for all users automatically. |
| [cartService](./*)                                   | Node.js       | Stores the items in the user's shopping cart in Redis and retrieves it.                                                           |
| [orderService](./*)                                  | Node.js       | Handle order request from the cart service                        |
| [customerService](./*)                               | Node.js       | Provides customer information, status, paymentCredits etc . |
| [inventoryService](./*)                              | Node.js       | Provides the list of products from a JSON file and ability to search products and get individual products.                        |
| [paymentService](./*)                                | Node.js       | Gives shipping cost estimates based on the shopping cart.(mock)                                |
| [shippingService](./*)                               | Node.js       | Track shippment and send an order-complete event to the order history                                                                                  |
| [notificationService](./*)                           | Python        | Sends users an order confirmation email (mock).                                      |
| [orderhistoryService](./*)                           | Node.js       | Provides order history and product catelogues.                                      
| [userInformationService](./*)                        | Java          | Provides user information and authenticate users. (*under_development)                                                            |
| [reviewService](./*)                                 | C#            | Review service for the product. 
| [rabbitMq](./*)                                      | JavaScript          | Passing messages between services.
  
## Microservice Patterns usages for development

- **[Domain-Driven Design Pattern](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html)**
  Define services corresponding to Domain-Driven Design (DDD) subdomains microservice pattern.
- **[Database per service Pattern](https://microservices.io/patterns/data/database-per-service.html)**
  Most services need to persist data in some kind of database.
- **[Saga Pattern](https://microservices.io/patterns/data/saga.html)**
  A saga is a sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction in the saga.
- **[Api-composition pattern](https://microservices.io/patterns/data/api-composition.html)**
  It's invoking the services that own the data and performs an in-memory join of the results.
- **[Event sourcing Pattern](https://microservices.io/patterns/data/event-sourcing.html)**
  To reliably/atomically update the database and publish messages/events.
- **[API Gateway / Backends for Frontends Pattern](https://microservices.io/patterns/apigateway.html)**
  To give the clients of a Microservices-based application access the individual services.
- **[Messaging Pattern](https://microservices.io/patterns/communication-style/messaging.html)**
  To collaborate and communicate services in a microservice-based application.
- **[Circuit Breaker Pattern](https://microservices.io/patterns/reliability/circuit-breaker.html)**
  To prevent a network or service failure from cascading to other services.
- **[Service Instance per container pattern](https://microservices.io/patterns/deployment/service-per-container.html)**
  All the services as a (Docker) container image and deploy each service instance as a container in the kubernetes.



--------------------------------------------------
# Documentation

## Reason for choosing RabbitMq:

It has enormous feathers and is freely available, which will be a great option to implement messaging queues in our microservices architecture project in this planspiel. This messaging queues pattern helps us to keep other services persistent while communicating with them. RabbitMQ has a functionality to keep the queues in priority so that consumers can easily get high priority messages or tasks.
For its huge ability and fulfill every requirement of us we choose this instead of others like Apache Kafka. Apache Kafka also is a great tool but for this project it is unnecessary to use other functionality which we do not need at all. Starting this lightweight RabbitMQ tool with huge functionality we can easily achieve our goals.

## Reason for choosing database per service:

For our project, We must ensure our application should be loosely coupled so that we can develop, deploy and scale it independently. Database per service gives us that opportunity to develop our application in such a way if we need to change one service database for example that it does not impact other services at all.

“Different services have different data storage requirements. For some services, a relational database is the best choice. Other services might need a NoSQL database such as MongoDB, which is good at storing complex, unstructured data, or Neo4J, which is designed to efficiently store and query graph data.”[2]

For those benefits, we found a database per service is the right choice for our application which is able to fulfill our every requirement.   


