import Express from "express";
const router = Express.Router();

import userRouter from "./user";

router.use("/api/user", userRouter);

export default router;
