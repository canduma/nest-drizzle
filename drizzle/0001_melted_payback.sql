CREATE TABLE IF NOT EXISTS "books" (
	"id" serial NOT NULL,
	"name" text,
	"user_id" integer
);

ALTER TABLE "user" ADD PRIMARY KEY ("id");
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "books_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
