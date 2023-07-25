import express from  "express"
import { createUserPermissions, getAllUserPermissions, getUserPermissions, updateUserPermissions } from "../controllers/routeController";
import { dynamicProtect } from "../middlewares/authMiddleware";
const router = express.Router();

router.route("/").get(dynamicProtect, getAllUserPermissions)
router.route("/:id").get(getUserPermissions).post(createUserPermissions).patch(updateUserPermissions);

export default router