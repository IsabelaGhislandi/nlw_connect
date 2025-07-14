
import { numeric } from "drizzle-orm/pg-core";
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const teste = pgTable('teste', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    telephone: text('telephone').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),

})