import express from "express"
import { createEntry, getEntries} from "../controllers/acude.controller.js"
const router = express.Router();
router.post("/register_acude", createEntry);
router.get("/get_acudes",getEntries)
export default router