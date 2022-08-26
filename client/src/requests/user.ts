import $axios from "./axios";

export const getAllUsers = (): Promise<{
    data: Neo4jOrgChart.User[];
}> => {
    return $axios.get("/user/all");
};

export const createUser = (
    user: Neo4jOrgChart.UserProposal
): Promise<{ data: Neo4jOrgChart.User }> => {
    return $axios.post("/user/new", user);
};

export const deleteUser = (userId: string): Promise<{ data: boolean }> => {
    return $axios.delete(`/user/${userId}`);
};
