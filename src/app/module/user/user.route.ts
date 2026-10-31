import { Router } from "express";
import { userController } from "./user.controller";
import auth, { Role } from "../../middleware/auth";

const router = Router();

router.get('/', userController.allUsers);
router.get('/single-user', auth(Role.admin), userController.singleUser);


export const UserRoute = router;