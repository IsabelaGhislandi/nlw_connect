
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const subscriptions = pgTable('subscriptions', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('name').notNull().unique(),
    telephone: integer('telephone').notNull(), 
    createdAt: timestamp('created_at').notNull().defaultNow(),

})