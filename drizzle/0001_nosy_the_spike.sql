CREATE TABLE "group_policies" (
	"groupId" integer NOT NULL,
	"policyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "policies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"access" text[] NOT NULL
);
--> statement-breakpoint
ALTER TABLE "group_policies" ADD CONSTRAINT "group_policies_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_policies" ADD CONSTRAINT "group_policies_policyId_policies_id_fk" FOREIGN KEY ("policyId") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;