import express from "express"
import { passwordEmailReset, verifyToken } from "../controllers/appController";
import { Authentication } from "../middlewares/authMiddleware";
const router = express.Router();

router.route('/reset').post(passwordEmailReset)
router.route('/verify').get( Authentication.protect("any"),verifyToken)



export default router