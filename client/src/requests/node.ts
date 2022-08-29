import $axios from "./axios";

export const createNode = async (proposal: Neo4jOrgChart.NodeProposal) => {
    return $axios.post("/node/new", proposal);
};

export const getAllNodes = async () => {
    return $axios.get("/node/all");
};

export const getNode = async (id: string) => {
    return $axios.get(`/node/${id}`);
};

export const deleteNode = async (id: string) => {
    return $axios.delete(`/node/${id}`);
};

export const deleteAllNodes = async () => {
    return $axios.delete("/node/all");
};

export const updateNode = async (
    proposal: Neo4jOrgChart.NodeUpdateProposal
) => {
    return $axios.put(`/node/${proposal.id}`, proposal);
};
