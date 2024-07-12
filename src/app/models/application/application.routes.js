import { Router } from "express";
import { getApps } from "./application.controler.js";

let router = Router()

router.get('/getApps',getApps )

export default router
