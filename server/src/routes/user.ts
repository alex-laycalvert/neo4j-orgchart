import Express, { Request, Response } from "express";
import {
    createNode,
    getNode,
    getNodes,
    deleteNode,
    updateNode,
    addNodeRelationship,
} from "../controller/";

const router = Express.Router();

router.route("/all").get(async (req: Request, res: Response) => {
    try {
        const users = await getNodes({ type: "User" });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.route("/new").post(async (req: Request, res: Response) => {
    try {
        const user = await createNode(req.body);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.route("/update").post(async (req: Request, res: Response) => {
    try {
        const user = await updateNode(req.body);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.route("/relationship").post(async (req: Request, res: Response) => {
    try {
        const users = await addNodeRelationship(req.body);
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.route("/").get(async (req: Request, res: Response) => {
    try {
        const user = await getNode(req.query);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
});

router
    .route("/:id")
    .get(async (req: Request, res: Response) => {
        try {
            const user = await getNode({ id: req.params.id });
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    })
    .delete(async (req: Request, res: Response) => {
        try {
            const deleted = await deleteNode(req.params.id);
            res.status(200).json(deleted);
        } catch (e) {
            res.status(500).json(e);
        }
    });

export default router;
