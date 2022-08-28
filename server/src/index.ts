import Express from "express";
import cors from "cors";
import logger from "morgan";
import Neode from "neode";
import config from "./config";
import router from "./routes";
import { initializeNeode, getInstance } from "./utils/neo4j";
import models from "./models";

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
        // initializing neo4j connection
        initializeNeode({
            uri: NEO4J_URI,
            username: NEO4J_USERNAME,
            password: NEO4J_PASSWORD,
            database: NEO4J_DATABASE,
        });

        const app = Express();

        app.use(logger("dev"));
        app.use(Express.urlencoded({ extended: true }));
        app.use(Express.json());
        app.use(
            cors({
                origin: FRONTEND_URL,
            })
        );
        app.use(router);

        // initializing neode models
        const instance: Neode = getInstance();
        models.forEach((model) => {
            instance.model(model.name, model.schema);
        });

        app.listen(PORT, () => {
            console.info(
                `neo4j orgchart express server listening on port ${PORT}`
            );
        });
    } catch (e) {
        console.error(e);
    }
})();
