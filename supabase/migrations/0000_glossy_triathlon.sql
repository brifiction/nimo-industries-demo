CREATE TABLE IF NOT EXISTS "search_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"search_query" text,
	"search_results" text,
	"created_at" timestamp DEFAULT now()
);
