"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const types_1 = require("./types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env file
// Define schema
// Parse and validate
const _env = types_1.envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
    process.exit(1); // exit app if env invalid
}
exports.env = _env.data;
