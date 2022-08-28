import Express from "express";

const router = Express.Router();

import nodeRouter from "./node";

router.use("/api/node", nodeRouter);

export default router;
