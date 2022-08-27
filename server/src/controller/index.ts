import { getSession } from "../utils/neo4j";
import { v4 as uuid } from "uuid";

/*
 * TODO
 *
 * - Refactor the method used to get/delete multiple nodes to avoid duplicate code
 * - Add a cypher helper to use functions to generate the query strings
 * - Remove types to make these functions more generic, should be able to grab any
 *   type of node, type, group, relationship, etc.
 *
 */

const emptyNode: Neo4jOrgChart.Node = {
    id: "",
    name: "",
};

export const createNode = async (
    proposal: Neo4jOrgChart.NodeProposal
): Promise<Neo4jOrgChart.Node> => {
    const existingNode = (await getNodes({ name: proposal.name }))[0];
    if (existingNode) return existingNode;
    let ret = emptyNode;
    const session = getSession();
    try {
        let query = "";
        // TODO refactor, this is the order to create a relationship that the query has to use
        if (proposal.relatedId && proposal.relationship) {
            query += `MATCH (r:OrgChartNode { id: '${proposal.relatedId}' })`;
        }
        query += `
            MERGE (n:OrgChartNode {
                id: '${uuid()}',
                name: '${proposal.name}'
            })
        `;
        if (proposal.relatedId && proposal.relationship) {
            query += ` -[:${proposal.relationship}]->(r)`;
        }
        query += "RETURN n";
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret =
            result.records.map((record) => record.get("n").properties)[0] ??
            emptyNode;
    } catch (e) {
        console.error(e);
    }
    await session.close();
    return ret;
};

export const getNodes = async (
    search: Neo4jOrgChart.NodeSearch
): Promise<Neo4jOrgChart.Node[]> => {
    let ret: Neo4jOrgChart.Node[] = [];
    const session = getSession();
    try {
        let query = "MATCH (n:OrgChartNode {";
        // TODO refactor to make it easier to implement new properties
        if (search.id && search.name) {
            query += `
                id: '${search.id},'
                name: '${search.name}'
            `;
        } else if (search.id) {
            query += `id: '${search.id}'`;
        } else if (search.name) {
            query += `name: '${search.name}'`;
        }
        query += "})";
        if (search.relatedId && search.relationship) {
            query += `
                -[:${search.relationship}]->
                (r:OrgChartNode {id: '${search.relatedId}'})
            `;
        }
        query += "RETURN n";
        const result = await session.readTransaction((tx) => tx.run(query));
        ret = result.records.map((record) => record.get("n").properties);
    } catch (e) {
        console.error(e);
    }
    await session.close();
    return ret;
};

export const deleteNodes = async (search: Neo4jOrgChart.NodeSearch) => {
    const session = getSession();
    try {
        let query = "MATCH (n:OrgChartNode {";
        // TODO refactor to make it easier to implement new properties
        if (search.id && search.name) {
            query += `
                id: '${search.id},'
                name: '${search.name}'
            `;
        } else if (search.id) {
            query += `id: '${search.id}'`;
        } else if (search.name) {
            query += `name: '${search.name}'`;
        }
        query += "})";
        if (search.relatedId && search.relationship) {
            query += `
                -[:${search.relationship}]->
                (r:OrgChartNode {id: '${search.relatedId}'})
            `;
        }
        query += "DETACH DELETE n";
        await session.writeTransaction((tx) => tx.run(query));
    } catch (e) {
        console.error(e);
    }
    await session.close();
};

export const deleteNode = async (id: string) => {
    try {
        await deleteNodes({ id });
    } catch (e) {
        console.error(e);
    }
};

export const updateNode = async (
    proposal: Neo4jOrgChart.NodeUpdateProposal
): Promise<Neo4jOrgChart.Node> => {
    const session = getSession();
    let ret: Neo4jOrgChart.Node = emptyNode;
    try {
        let query = `MATCH (n:OrgChartNode { id: '${proposal.id}' })`;
        switch (proposal.type) {
            case "PROPERTY":
                query += `
                    SET n.${proposal.key} = '${proposal.value}'
                `;
                break;
            case "RELATIONSHIP":
                query += `
                    MATCH (r:OrgChartNode { id: '${proposal.relatedId}' })
                    MERGE (n)-[:${proposal.relationship}]->(r)
                `;
                break;
            default:
                break;
        }
        query += "RETURN n";
        const result = await session.writeTransaction((tx) => tx.run(query));
        ret =
            result.records.map((record) => record.get("n").properties)[0] ??
            emptyNode;
    } catch (e) {
        console.error(e);
    }
    await session.close();
    return ret;
};
