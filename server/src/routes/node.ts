import Express from "express";
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
        const createdNode = await instance.create("OrgChartNode", req.body);
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
                message: "error creating node",
                data: e,
            });
        }
    })
    .put(async (req, res) => {
        try {
            const instance = getInstance();
            const node = await instance.find("OrgChartNode", req.params.id);
            const updatedNode = await node.update(req.body);
            res.status(200).json({
                message: "updated node",
                data: await updatedNode.toJson(),
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
            const instance = getInstance();
            const node = await instance.find("OrgChartNode", req.params.id);
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
