# Spider Solution (Crawler) in NestJS

This is a spider solution (crawler) built using NestJS, which receives crawling requests and extracts links from web pages based on a specified starting URL. The solution implements a Breadth-First Search (BFS) crawling strategy with support for scalability, persistence, and handling a high number of requests and heavy crawling.

## Features

- Crawls web pages using the BFS algorithm.
- Receives crawling requests with a starting URL, maximum number of links to return, and crawl depth.
- Supports parallel processing to handle a high number of requests efficiently.
- Persists crawling requests and their results.
- Optimized for heavy requests with pages containing many links and deep crawling.
- Scalable architecture for distributed deployment.
- RESTful API endpoints for submitting crawling requests and retrieving crawled data.

## Requirements

- Node.js 
- npm
- MongoDB (optional, if using persistence)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/g4lb/spider-solution.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spider-solution
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the configuration:

   - Copy the `.env.example` file and rename it to `.env`.
   - Modify the configuration parameters in the `.env` file as per your environment.

5. Start the application:

   ```bash
   npm run start
   ```

   The application will start running on `http://localhost:3001`.

## Usage

1. Send a POST request to `http://localhost:3001/crawler` with the following JSON payload:

   ```json
   {
     "startUrl": "https://example.com",
     "maxLinks": 10,
     "crawlDepth": 3
   }
   ```

   - `startUrl`: The starting URL for crawling.
   - `maxLinks`: The maximum number of links to return.
   - `crawlDepth`: The depth to which the crawler should enter (nested links).

2. The application will initiate the crawling process and return the crawled links as a JSON response.

## Persistence (Optional)

If you want to enable persistence for the crawling requests and their results, follow these additional steps:

1. Install MongoDB and ensure it is running on your system.

2. Update the `.env` file with your MongoDB connection details:

   ```dotenv
   MONGODB_URI=mongodb://localhost:27017/spider_solution
   ```

   Modify the `MONGODB_URI` value to match your MongoDB connection string.

3. Start the application:

   ```bash
   npm run start
   ```

   The application will now persist the crawling requests and their results in the configured MongoDB database.

## Design Concept

1. Architecture Overview:

   - The spider solution follows a microservices architecture, separating concerns into modules to promote modularity and maintainability.
   - The main components include:
      - Crawler Module: Responsible for handling crawling requests, executing the crawling algorithm, and persisting the crawled data.
      - Database Module: Handles database interactions for storing and retrieving crawled data.
      - API Module: Provides the RESTful API endpoints for receiving crawling requests and returning crawled data.
      - Queue Module: Manages a message queue system to handle asynchronous processing and distribute crawling tasks across multiple instances.

2. Crawler Module:

   - Contains the core logic for crawling web pages using the BFS algorithm.
   - Includes the CrawlerService that encapsulates the crawling functionality, such as extracting links, managing visited URLs, and storing crawled data.
   - Utilizes libraries like Axios for making HTTP requests and Cheerio for parsing HTML content and extracting links.
   - Implements parallel processing techniques to handle a high number of requests concurrently, improving performance and scalability.
   - Integrates with the Database Module to persist crawled data.

3. Database Module:
   - Manages the interaction with the database for storing and retrieving crawled data.
   - Utilizes an ORM (Object-Relational Mapping) library like Mongoose or TypeORM to interact with the database.
   - Defines a schema and model for the CrawledData entity, specifying the structure of the crawled data to be stored.
   - Handles database operations, such as saving crawled data, querying for specific data, and managing database connections and transactions.

4. API Module:
   - Exposes the RESTful API endpoints to receive crawling requests and return crawled data.
   - Utilizes the NestJS framework's decorators and controllers to define the API routes.
   - Validates and sanitizes the incoming requests, ensuring the required parameters are provided and within acceptable limits.
   - Uses the Crawler Service to initiate the crawling process and return the crawled data as a response.

5. Queue Module (optional):
   - Implements a message queue system (e.g., RabbitMQ, Kafka) to handle asynchronous processing and distribute crawling tasks across multiple instances.
   - Decouples the crawling requests from the processing logic, improving scalability and fault-tolerance.
   - Queues incoming crawling requests, and worker instances pick up tasks from the queue and process them asynchronously.
   - Allows for easy scaling by adding more worker instances as the workload increases.

6. Error Handling and Logging:
   - Implements appropriate error handling mechanisms throughout the application, handling exceptions, and returning meaningful error responses to the client.
   - Utilizes logging libraries like Winston or Bunyan to log important events and errors, facilitating troubleshooting and monitoring of the system.

7. Scalability and Performance:
   - Uses techniques like parallel processing, distributed architecture, and caching to support high request volumes and heavy requests with deep crawling.
   - Implements caching mechanisms to reduce redundant crawling of the same URLs.
   - Distributes the spider solution across multiple instances or servers, utilizing load balancing and container orchestration technologies to handle scalability requirements.

8. Monitoring and Metrics:
   - Incorporates monitoring tools like Prometheus or Datadog to collect and visualize performance metrics, such as request latency, error rates, and resource utilization.
   - Implements health checks and monitors the system's vital components to ensure availability and performance.