import { getSession } from "../utils/neo4j";
import { v4 as uuid } from "uuid";

const emptyNode: Neo4jOrgChart.Node = {
    id: "",
};

export const createNode = async (
    proposal: Neo4jOrgChart.NodeProposal
): Promise<Neo4jOrgChart.Node> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node;
    try {
        let query = `MERGE (n:${proposal.type} { id: '${uuid()}',`;
        Object.entries(proposal.data).forEach((entry, index, array) => {
            query += `${entry[0]}: '${entry[1]}'`;
            if (index !== array.length - 1) query += ",";
        });
        query += "}) RETURN n";
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret =
            result.records.map((record) => record.get("n").properties)[0] ??
            emptyNode;
    } catch (e) {
        console.error(e);
        ret = emptyNode;
    }
    await session.close();
    return ret;
};

export const getNode = async (search: any): Promise<Neo4jOrgChart.Node> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node;
    try {
        let query = `MATCH (n:${search.type} {`;
        Object.entries(search.data).forEach((entry, index, array) => {
            query += `n.${entry[0]} = '${entry[1]}'`;
            if (index !== array.length - 1) query += ",";
        });
        query += "}) RETURN n";
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret =
            result.records.map((record) => record.get("n").properties)[0] ??
            emptyNode;
    } catch (e) {
        console.error(e);
        ret = emptyNode;
    }
    await session.close();
    return ret;
};

export const getNodes = async (search: any): Promise<Neo4jOrgChart.Node[]> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node[] = [];
    try {
        let query = `MATCH (n:${search.type} {`;
        Object.entries(search).forEach((entry, index, array) => {
            if (entry[0] === "type") return;
            query += `n.${entry[0]} = '${entry[1]}'`;
            if (index !== array.length - 1) query += ",";
        });
        query += "}) RETURN n";
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret = result.records.map((record) => record.get("n").properties) ?? [];
    } catch (e) {
        console.error(e);
    }
    await session.close();
    return ret;
};

export const getAllNodes = async (): Promise<Neo4jOrgChart.Node[]> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node[] = [];
    try {
        let query = "MATCH (n) RETURN n";
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret = result.records.map((record) => record.get("n").properties) ?? [];
    } catch (e) {
        console.error(e);
    }
    await session.close();
    return ret;
};

export const updateNode = async (
    proposal: Neo4jOrgChart.NodeUpdateProposal
): Promise<Neo4jOrgChart.Node> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node;
    try {
        const query = `
            MATCH (n {
                id: '${proposal.id}'
            })
            SET n.${proposal.key} = '${proposal.value}'
            RETURN n
        `;
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret =
            result.records.map((record) => record.get("n").properties)[0] ??
            emptyNode;
    } catch (e) {
        console.error(e);
        ret = emptyNode;
    }
    await session.close();
    return ret;
};

export const addNodeRelationship = async (
    proposal: Neo4jOrgChart.NodeRelationshipProposal
): Promise<Neo4jOrgChart.Node[]> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node[] = [];
    try {
        const query = `
            MATCH (n1 {
                id: '${proposal.id}'
            })
            MATCH (n2 {
                id: '${proposal.relatedId}'
            })
            MERGE (n1)-[:${proposal.relationship}]->(n2)
            RETURN n1, n2
        `;
        const result = await session.writeTransaction((tx) => tx.run(query));
        result.records.forEach((record) => {
            ret.push(record.get("n1").properties);
            ret.push(record.get("n2").properties);
        });
    } catch (e) {
        console.error(e);
    }
    await session.close();
    return ret;
};

export const deleteNode = async (id: string): Promise<void> => {
    const session = getSession();
    try {
        const query = `
            MATCH (n {
                id: '${id}'
            })
            DETACH DELETE n
        `;
        await session.writeTransaction((tx) => tx.run(query));
    } catch (e) {
        console.error(e);
    }
    await session.close();
};
