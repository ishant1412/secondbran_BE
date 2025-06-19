const z = require("zod")
const contentTypes = ['image', 'video', 'article',"tweet",'instapost','notes'];





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
})

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
  DOMAIN:z.string().url(),
  FE_URL:z.string(),
  SALT_ROUNDS:z.string(),
});
const contentZodSchema = z.object({
    link: z.string().url().optional(),
    type: z.enum(contentTypes),
    title: z.string(),
    description:z.string(),
    shareable:z.boolean().default(false).optional(),
    tags: z.array(z.string()).optional(), 
    userId: z.string().regex(/^[a-f\d]{24}$/i).optional(), // ObjectId as string
});

export{
    contentTypes,
    usertype,
    envSchema,
    contentZodSchema
}