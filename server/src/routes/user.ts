import Express, { Request, Response } from "express";
import { createUser, getAllUsers } from "../controllers/user";

const router = Express.Router();

router.route("/").get((req: Request, res: Response) => {
    res.redirect("/api/user/all");
});

router.route("/all").get(async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.route("/new").post(async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;
