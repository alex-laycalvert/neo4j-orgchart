import Express from "express";
import cors from "cors";
import logger from "morgan";
import config from "./config";
import router from "./routes";
import { initNeo4j } from "./utils/neo4j";

const {
    PORT,
    FRONTEND_URL,
    NEO4J_URI,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
    NEO4J_DATABASE,
} = config();

(async () => {
    try {
        const app = Express();
        const connection = await initNeo4j({
            uri: NEO4J_URI,
            username: NEO4J_USERNAME,
            password: NEO4J_PASSWORD,
            database: NEO4J_DATABASE,
        });
        if (!connection) {
            console.error("failed to connect to database");
            return;
        }
        console.info("connected to neo4j database: ", connection);

        app.use(logger("dev"));
        app.use(Express.urlencoded({ extended: true }));
        app.use(Express.json());
        app.use(
            cors({
                origin: FRONTEND_URL,
            })
        );
        app.use(router);

        app.listen(PORT, () => {
            console.info(
                `neo4j orgchart express server listening on port ${PORT}`
            );
        });
    } catch (e) {
        console.error(e);
    }
})();
