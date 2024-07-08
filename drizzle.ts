import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resource } from "sst";

const client = postgres(process.env.DATABASE_URL! ?? Resource.DbUrl.value);

export const db = drizzle(client);
