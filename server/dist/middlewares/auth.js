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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
// ! --> means do not check this
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, SECRET, (err, decodeToken) => {
                if (err)
                    return res.sendStatus(403);
                if (!decodeToken)
                    return res.sendStatus(403);
                if (typeof decodeToken === "string")
                    return res.sendStatus(403);
                req.headers['userId'] = decodeToken.id;
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    });
}
exports.isAuthenticated = isAuthenticated;
