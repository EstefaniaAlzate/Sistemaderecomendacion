import express from "express"
import { createEntry, deleteEntry, getEntries, updateEntry} from "../controllers/acude.controller.js"
const router = express.Router();
router.post("/register_acude", createEntry);
router.get("/get_acudes",getEntries);
router.delete("/delete_acude/:id", deleteEntry);
router.put("/update_acude/:id", updateEntry);
export default router