import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const searchHistoryTable = pgTable("search_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"),
  searchQuery: text("search_query"),
  searchResults: text("search_results"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertSearchHistory = typeof searchHistoryTable.$inferInsert;
export type SelectSearchHistory = typeof searchHistoryTable.$inferSelect;
