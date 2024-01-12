"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../middlewares/user");
const user_2 = require("../controllers/user");
const router = express_1.default.Router();
router.route('/signup').post(user_1.checkUserEmailInDb, user_2.handleUserSignup);
router.route("/login").post(user_2.handleUserLogin);
exports.default = router;
