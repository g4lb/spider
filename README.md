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

## Design concept

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