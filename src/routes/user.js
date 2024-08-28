import { Router } from "express";
import RegisterUser from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route("/register").post(
    upload.single('avatar'),
    RegisterUser
);

export default router;
