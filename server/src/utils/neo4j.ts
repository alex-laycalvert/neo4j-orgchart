import Neode from "neode";

interface NeodeConfig {
    uri: string;
    username: string;
    password: string;
    database: string;
    models: Neo4jOrgChart.Neo4jModel[];
    enterprise?: boolean;
}

let _instance: Neode;
let _config: NeodeConfig;

export const initializeNeode = (config: NeodeConfig) => {
    if (_instance) return;
    _config = config;
    _instance = new Neode(
        _config.uri,
        _config.username,
        _config.password,
        _config.enterprise,
        _config.database
    );
};

export const getInstance = (): Neode => {
    return _instance;
};

export const createModels = () => {
    return _config.models.map((model) =>
        _instance.model(model.name, model.schema)
    );
};
