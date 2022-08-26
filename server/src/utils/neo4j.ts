import * as Neo4j from "neo4j-driver";

interface Neo4jDriverOptions {
    uri: string;
    username: string;
    password: string;
    database: string;
}

let driver: Neo4j.Driver;
let config: Neo4jDriverOptions;

export const initNeo4j = async (options: Neo4jDriverOptions) => {
    config = options;
    driver = Neo4j.driver(
        config.uri,
        Neo4j.auth.basic(config.username, config.password)
    );
    return await driver.verifyConnectivity();
};

export const close = () => {
    driver.close();
};

export const getDriver = (): Neo4j.Driver => {
    return driver;
};

export const getSession = (database?: string) => {
    return driver.session({ database: database ?? config.database });
};
