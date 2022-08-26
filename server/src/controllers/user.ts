import { getSession } from "../utils/neo4j";
import { v4 as uuid } from "uuid";

const nullUser: Neo4jOrgChart.User = {
    id: "",
    firstName: "",
    lastName: "",
    occupation: "",
};

export const getAllUsers = async (): Promise<Neo4jOrgChart.User[]> => {
    try {
        const session = getSession();
        const query = `
            MATCH (u:User)
            RETURN u
        `;
        const result = await session.readTransaction((tx) => tx.run(query));
        session.close();
        return result.records.map((value) => value.get("u").properties);
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createUser = async (
    user: Neo4jOrgChart.UserProposal
): Promise<Neo4jOrgChart.User> => {
    try {
        const session = getSession();
        const query = `
            MERGE(u:User {
                id: '${uuid()}',
                firstName: '${user.firstName}',
                lastName: '${user.lastName}',
                occupation: '${user.occupation}'
            })
            RETURN u
        `;
        const result = await session.writeTransaction((tx) => tx.run(query));
        return (
            result.records.map((value) => value.get("u").properties)[0] ??
            nullUser
        );
    } catch (e) {
        console.error(e);
        return nullUser;
    }
};
