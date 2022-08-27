import $axios from "./axios";

export const createNode = async (proposal: Neo4jOrgChart.NodeProposal) => {
    return $axios.post("/node/new", proposal);
};

export const getNodes = async (search: Neo4jOrgChart.NodeSearch) => {
    return $axios.get("/node", { params: search });
};

export const getAllNodes = async (): Promise<{
    data: Neo4jOrgChart.Node[];
}> => {
    return $axios.get("/node/all");
};

export const deleteNode = async (id: string) => {
    return $axios.delete(`/node/${id}`);
};

export const deleteNodes = async (search: Neo4jOrgChart.NodeSearch) => {
    return $axios.delete("/node", { params: search });
};

export const updateNode = async (
    proposal: Neo4jOrgChart.NodeUpdateProposal
) => {
    return $axios.post("/node/update", proposal);
};
