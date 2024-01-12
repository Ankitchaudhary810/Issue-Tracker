import express from "express"
import {checkUserEmailInDb} from "../middlewares/user"
import {handleUserLogin, handleUserSignup} from "../controllers/user"

const router = express.Router();


router.route('/signup').post(checkUserEmailInDb, handleUserSignup);
router.route("/login").post(handleUserLogin)


export default router