import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const searchHistoryTable = pgTable("search_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  searchQuery: text("search_query"),
  searchResults: text("search_results"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertSearchHistory = typeof searchHistoryTable.$inferInsert;
export type SelectSearchHistory = typeof searchHistoryTable.$inferSelect;
