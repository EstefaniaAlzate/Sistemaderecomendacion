import express from "express"
import { registerUser, logUser, getAdmins, deleteAdmin, updateAdmin } from "../controllers/user.controller.js"
const router = express.Router();
router.post("/register_user", registerUser);
router.post("/login_user", logUser);
router.get('/get_admins', getAdmins);
router.delete('/delete_admin/:id', deleteAdmin);
router.put('/update_admin/:id', updateAdmin);
export default router