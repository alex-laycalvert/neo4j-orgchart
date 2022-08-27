import Express from "express";
import {
    createNode,
    deleteNode,
    deleteNodes,
    getNodes,
    updateNode,
} from "../controller";

const router = Express.Router();

router.route("/new").post(async (req, res) => {
    try {
        const node = await createNode(req.body);
        res.status(200).json(node);
    } catch (e) {
        res.status(500).json(e);
    }
});

router
    .route("/all")
    .get(async (req, res) => {
        try {
            const nodes = await getNodes({});
            res.status(200).json(nodes);
        } catch (e) {
            res.status(500).json(e);
        }
    })
    .delete(async (req, res) => {
        try {
            await deleteNodes({});
            res.status(200).json({ message: "nodes deleted" });
        } catch (e) {
            res.status(500).json(e);
        }
    });

router.route("/update").post(async (req, res) => {
    try {
        const node = await updateNode(req.body);
        res.status(200).json(node);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.route("/:id").delete(async (req, res) => {
    try {
        await deleteNode(req.params.id);
        res.status(200).json({ message: "node deleted" });
    } catch (e) {
        res.status(500).json(e);
    }
});

router
    .route("/")
    .get(async (req, res) => {
        try {
            console.log("body", req.body);
            console.log("params", req.params);
            const nodes = await getNodes(req.params);
            res.status(200).json(nodes);
        } catch (e) {
            res.status(500).json(e);
        }
    })
    .delete(async (req, res) => {
        try {
            await deleteNodes(req.body);
            res.status(200).json({ message: "nodes deleted" });
        } catch (e) {
            res.status(500).json(e);
        }
    });

export default router;
