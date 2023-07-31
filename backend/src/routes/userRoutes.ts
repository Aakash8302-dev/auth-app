import express from 'express'
import { createUser, getAllUsers, deleteUser, getUserById, loginUser, createAdmin} from "../controllers/userController";
import { Authentication, dynamicProtect } from '../middlewares/authMiddleware';
import { ALL_PERMISSIONS } from '../constants/permissions';

const router = express.Router();

router.route('/')
.get(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_GET_ALL_USERS), getAllUsers)
.post(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_CREATE_USER),createUser);

router.route('/:id')
.delete(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_DELETE_USER_BY_ID),deleteUser)
.get(Authentication.dynamicProtect(ALL_PERMISSIONS.PERMISSIONS_GET_USER_BY_ID),getUserById);

router.route('/login').post(loginUser);

router.route('/createAdmin').post(createAdmin)

export default router

