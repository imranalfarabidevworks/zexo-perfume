import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

// better-auth talks to MySQL directly through a mysql2 Pool.
// It will use the `user`, `session`, `account`, `verification`
// tables created in schema.sql.
export const auth = betterAuth({
  database: createPool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false, // customers can never set their own role at signup
      },
    },
  },
});
