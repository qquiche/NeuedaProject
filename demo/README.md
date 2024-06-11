# Demo Spring Boot Maven Project

This is a demo Spring Boot Maven project featuring a CRUD application with MockMvc tests. It is designed as an introduction to Spring.

## Getting Started

1. **Checkout the Project**:
   Clone the project repository to your local machine and import it into your IDE.

2. **Project Branches**:
    - Start with the branch `_1_run_and_test`.
    - Follow the TODOs in the code to understand and complete the tasks.
    - Once you are done, checkout the next branch (`_2...`) and repeat the process.

## Sequence Diagram

Here is the sequence diagram of the application's flow:

Client (Browser) -> UserController -> UserRepository -> H2 Database

```
    Client                   UserController          UserRepository           H2 Database
    |                          |                        |                        |
    |       HTTP Request       |                        |                        |
    | localhost:8080/api/users |                        |                        |
    |------------------------->|                        |                        |
    |                          |                        |                        |
    |                          |  Call to Repository    |                        |
    |                          |      findAll()         |                        |
    |                          |----------------------->|                        |
    |                          |                        |                        |
    |                          |                        |  Query Execution       |
    |                          |                        |----------------------->|
    |                          |                        |                        |
    |                          |                        |  Query Result          |
    |                          |                        |<-----------------------|
    |                          |                        |                        |
    |                          |  Data from Repository  |                        |
    |                          | <----------------------|                        |
    |	 Response with JSON    |                        |                        |
    |<-------------------------|                        |                        |
    |                          |                        |                        |
```


## Branches Overview

- **`_1_run_and_test`**: Basic setup and initial run and test.
- **`_6_crud`**: Full example: REST API (GET, POST, PUT, DELETE); H2 in-memory DB, Swagger for endpoint tests and MockMvc automated tests 
- **`_fixme_...`**: Additional exercises to challenge your skills (more details at the end of this README)

## Tools and Technologies

- **Spring Boot**: For building the application.
- **Maven**: For dependency management.
- **Spring Web Mvc**: For building a web app.
- **Swagger/Open API**: For easy endpoint testing in the browser.
- **Spring Data JPA**: For easy DB access.
- **H2 Database**: In-memory database for development and testing.
- **MockMvc**: For testing Spring MVC controllers.

## Benchmark for Spring Beginners

As a benchmark for Spring beginners, you should aim to create a model, controller, repository, and a MockMvc test checking the status code in less than 20 minutes.

## Extra Exercises: fixme

- If you find the pace too slow for your current skill level, explore the `fixme` branches. 
- Each branch contains a test with an issue that needs fixing. 
- Run the tests and try to resolve the problem without modifying the test classes. 
- You can check the solutions by comparing commits, but take your time to analyze the code and try to fix the issue on your own. Use resources like Google to help you troubleshoot.
