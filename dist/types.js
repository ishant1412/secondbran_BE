"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentZodSchema = exports.envSchema = exports.usertype = exports.contentTypes = void 0;
const z = require("zod");
const contentTypes = ['image', 'video', 'article', "tweet", 'instapost', 'notes'];
exports.contentTypes = contentTypes;
const usertype = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(20, { message: "Username must be at most 20 characters long." }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one digit." })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
    email: z.string()
        .email({ message: "Invalid email address." }),
});
exports.usertype = usertype;
const envSchema = z.object({
    PORT: z.string().default('3000'),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    DOMAIN: z.string().url(),
    FE_URL: z.string().url(),
    SALT_ROUND: z.string(),
});
exports.envSchema = envSchema;
const contentZodSchema = z.object({
    link: z.string().url(),
    type: z.enum(contentTypes),
    title: z.string(),
    description: z.string(),
    shareable: z.boolean(),
    tags: z.array(z.string().regex(/^[a-f\d]{24}$/i)).optional(), // ObjectId as string
    userId: z.string().regex(/^[a-f\d]{24}$/i), // ObjectId as string
});
exports.contentZodSchema = contentZodSchema;
