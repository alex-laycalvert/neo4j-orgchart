import dotenv from "dotenv-safe";
export default () => {
    dotenv.config();

    return {
        PORT: process.env.PORT || 5000,
        FRONTEND_URL: process.env.FRONTEND_URL,
        NODE_ENV: process.env.NODE_ENV,
        NEO4J_URI: process.env.NEO4J_URI ?? "bolt://localhost",
        NEO4J_USERNAME: process.env.NEO4J_USERNAME ?? "neo4j",
        NEO4J_PASSWORD: process.env.NEO4J_PASSWORD ?? "neo4j",
        NEO4J_DATABASE: process.env.NEO4J_DATABASE ?? "neo4j",
    };
};
