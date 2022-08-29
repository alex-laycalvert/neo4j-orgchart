# neo4j-orgchart

A simple implementation of an organization chart using React, Express, and Neo4j

**_WORK IN PROGRESS_**

## Current Features

-   Nodes can be created using the basic form on the page
-   Nodes can have their relationships update using the other form (only the supervises relationship is supported)
-   The database _MUST_ have a root node with an `id` of `0` for chart to function
-   Nodes can be deleted by clicking on them, must refresh page to view changes (the root node cannot be deleted)
-   _DO NOT_ update a node to `supervise` the root node, this will cause a relationship loop that will infinitely generate nodes

## TODO

-   Refresh nodes on page when deleting a node
-   Protect against relationship loops
-   Use a menu to drag and drop created nodes onto org chart
-   Reset form on creating/updating nodes but do not refresh the page
-   Do not save org chart immediately when changes are implemented, use a proposal to save the state of the org chart when user attempts to save

## Installing and Running

NOTE: You must have access to a neo4j database instance to connect to with valid credentials.

```
# Clone the repo
git clone https://github.com/neo4j-orgchart
```

### Server Setup

```
# Navigate to repo
cd /path/to/neo4j-orgchart
cd server

# Add env config (change the appropriate variables)
cp .env.example .env

# Install dependencies
npm install

# Run for production
npm start

# Run for development
npm run dev
```

### Client Setup

```
# Navigate to repo
cd /path/to/neo4j-orgchart
cd client

# Add settings config (change the appropriate variables)
cp src/settings.json.example src/settings.json

# Install dependencies
npm install

# Run for production
npm run build
npm run start

# Run for development
npm run start
```

The frontend will be available in your web browser at http://localhost:3000/orgchart

The backend runs at port 5000 by default.
