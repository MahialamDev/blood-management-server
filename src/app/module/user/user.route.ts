import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get('/', userController.allUsers);


export const UserRoute = router;