import express from "express";
import{createBand, editBand, joinBand} from"../controller/band.controller.js";

import {authMiddleware} from "../niddlewares/auth.middleware.js";

const router= express.Router();

router.post("/create", authMiddleware,createBand);
router.put("/edit/:id", authMiddleware, editBand);
router.post("/join/id", authMiddleware, joinBand);

export default router;



/// in server,js
// import bandRoutes from "./routes/band.routes.js";

// app.use("/api/bands", bandRoutes);
