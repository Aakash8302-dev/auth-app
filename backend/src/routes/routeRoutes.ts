import express from  "express"
import { createUserPermissions, getAllUserPermissions, getUserPermissions, updateUserPermissions, getOptionalPermissions } from "../controllers/routeController";
import { Authentication } from "../middlewares/authMiddleware";
import { ALL_PERMISSIONS } from "../constants/permissions";
const router = express.Router();

router.route("/").get(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_GET_ROUTES_ACCESSIBLE_ALL_USERS), getAllUserPermissions)

router.route("/optionalpermissions")
.get(getOptionalPermissions);

router.route("/permissions/:id")
.get(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_GET_ROUTES_ACCESSIBLE_BY_ID),getUserPermissions)
.post(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_CREATE_USER_ROUTES_ACCESSIBLE), createUserPermissions)
.patch(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_UPDATE_ROUTES_ACCESSIBLE), updateUserPermissions);


export default router