import express from "express"
import { passwordEmailReset, resetPassword, verifyToken } from "../controllers/appController";
import { Authentication} from "../middlewares/authMiddleware";
import { ALL_PERMISSIONS } from "../constants/permissions";
const router = express.Router();

router.route('/reset').post(passwordEmailReset)
router.route('/resetpass').post(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_RESET_PASSWORD),resetPassword)
router.route('/verify').get(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_VERIFY),verifyToken)

export default router