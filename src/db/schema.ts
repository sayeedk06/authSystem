import { serial, pgTable, text, integer } from "drizzle-orm/pg-core";


export const groupsTable = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const policiesTable = pgTable("policies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  access: text("access").array().notNull(),
});

export const groupPoliciesTable = pgTable("group_policies", {
  groupId: integer("groupId")
    .references(() => groupsTable.id, {onDelete: 'cascade'})
    .notNull(),
  policyId: integer("policyId")
    .references(() => policiesTable.id, {onDelete: 'cascade'})
    .notNull(),
});

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
//   userGroup: integer('userGroup').references(()=>groupsTable.id, {onDelete: 'cascade'})

});
