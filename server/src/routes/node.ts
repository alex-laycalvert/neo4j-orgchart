import Express from "express";
import Neode from "neode";
import { getInstance } from "../utils/neo4j";

const router = Express.Router();

router
    .route("/all")
    .get(async (req, res) => {
        try {
            const instance = getInstance();
            const results = await instance.all("OrgChartNode");
            res.status(200).json({
                message: "returned all nodes",
                data: await results.toJson(),
            });
        } catch (e) {
            res.status(500).json({
                message: "error returning all nodes",
                data: e,
            });
        }
    })
    .delete(async (req, res) => {
        try {
            const instance = getInstance();
            await instance.deleteAll("OrgChartNode");
            res.status(200).json({
                message: "deleted all nodes",
            });
        } catch (e) {
            res.status(500).json({
                message: "error deleting all nodes",
                data: e,
            });
        }
    });

router.route("/new").post(async (req, res) => {
    try {
        const instance = getInstance();
        const existingNodes = await instance.all("OrgChartNode", {
            name: req.body.name,
        });
        if (existingNodes.first()) {
            res.status(409).json({
                message: "node already exists",
                data: await existingNodes.first().toJson(),
            });
            return;
        }
        const createdNode = await instance.merge("OrgChartNode", req.body);
        if (req.body.relatedId) {
            const relatedNode = await instance.find(
                "OrgChartNode",
                req.body.relatedId
            );
            await createdNode.relateTo(relatedNode, req.body.relationship, {
                since: Date.now(),
            });
        }
        res.status(200).json({
            message: "created node",
            data: await createdNode.toJson(),
        });
    } catch (e) {
        res.status(500).json({
            message: "error creating node",
            data: e,
        });
    }
});

router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const instance = getInstance();
            const node = await instance.find("OrgChartNode", req.params.id);
            res.status(200).json({
                message: "returned node",
                data: await node.toJson(),
            });
        } catch (e) {
            res.status(500).json({
                message: "error returning node",
                data: e,
            });
        }
    })
    .put(async (req, res) => {
        try {
            const instance = getInstance();
            const node = await instance.find("OrgChartNode", req.params.id);
            let update: any;
            switch (req.body.type) {
                case "PROPERTY":
                    update = await node.update({
                        [req.body.key]: req.body.value,
                    });
                    break;
                case "RELATIONSHIP":
                    const relatedNode = await instance.find(
                        "OrgChartNode",
                        req.body.relatedId
                    );
                    update = await node.relateTo(
                        relatedNode,
                        req.body.relationship,
                        { since: Date.now() }
                    );
                    break;
                default:
                    break;
            }
            res.status(200).json({
                message: "updated node",
                data: await update.toJson(),
            });
        } catch (e) {
            res.status(500).json({
                message: "error updating node",
                data: e,
            });
        }
    })
    .delete(async (req, res) => {
        try {
            if (req.params.id === "0") {
                res.status(400).json({
                    message: "cannot delete root node",
                });
                return;
            }
            const instance = getInstance();
            const node = await instance.find("OrgChartNode", req.params.id);
            const children = node.get("supervises") as Array<any>;
            if (children.length > 0) {
                const queryResults = await instance.cypher(
                    "MATCH (s:OrgChartNode)-[r:SUPERVISES]->(n:OrgChartNode { id: $nodeId }) RETURN s",
                    { nodeId: req.params.id }
                );
                const supervisorId =
                    queryResults.records.map(
                        (record) => record.get("s")?.properties?.id
                    )?.[0] ?? "0";
                const supervisor = await instance.find(
                    "OrgChartNode",
                    supervisorId
                );
                children.forEach(async (child: Neode.Relationship) => {
                    await supervisor.relateTo(child.endNode(), "supervises", {
                        since: Date.now(),
                    });
                });
            }
            await instance.delete(node);
            res.status(200).json({
                message: "deleted node",
            });
        } catch (e) {
            res.status(500).json({
                message: "error updating node",
                data: e,
            });
        }
    });

export default router;
