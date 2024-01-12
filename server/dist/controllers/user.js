"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogin = exports.handleUserSignup = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inputSchema = zod_1.default.object({
    fullName: zod_1.default.string().max(20).optional(),
    email: zod_1.default.string().email({ message: "Provide valid email" }),
    password: zod_1.default.string().min(5, { message: "Password not less then 5" }).max(10, { message: "Password not More then 10" })
});
const prisma = new client_1.PrismaClient();
function handleUserSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputValues = inputSchema.safeParse(req.body);
            if (!inputValues.success) {
                return res.json(inputValues.error);
            }
            const { fullName, email, password } = inputValues.data;
            const user = yield prisma.users.create({
                data: {
                    fullName,
                    email,
                    password
                }
            });
            return res.sendStatus(201);
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(501);
        }
    });
}
exports.handleUserSignup = handleUserSignup;
function handleUserLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const inputValues = inputSchema.safeParse(req.body);
            if (!inputValues.success) {
                return res.json(inputValues.error);
            }
            const user = yield prisma.users.findUnique({
                where: {
                    email: email,
                    password: password
                }
            });
            if (user) {
                const token = yield jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.SECRET);
                res.status(200).json(token);
            }
            res.json({ msg: "User not Found" });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(501);
        }
    });
}
exports.handleUserLogin = handleUserLogin;
