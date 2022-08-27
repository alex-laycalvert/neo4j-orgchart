# neo4j-orgchart

A simple implementation of an organization chart using React, Express, and Neo4j

**_WORK IN PROGRESS_**
Currently the only features are viewing all existing nodes in the database and creating nodes that appear in a list on the frontend.

## Current Features

-   Adding `nodes` with a `name` property
-   Updating `nodes` to have relationships with other `nodes` after creation
    -   Current Relationship Types: `SUPERVISES`, `BELONGS_TO`
-   Viewing all `nodes` in a list displaying their `name`
-   Deleting `nodes` from the list

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
