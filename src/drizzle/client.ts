import postgres from 'postgres'
import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { subscriptions } from './tables/subscriptions'

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
    schema: {
        subscriptions,
    }
})