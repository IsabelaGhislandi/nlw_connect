import postgres from 'postgres'
import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { subscriptions } from './tables/subscriptions'
import { teste } from './tables/teste'

export const pg = postgres("postgresql://docker:docker@localhost:5432/connect")
export const db = drizzle(pg, {
    schema: {
        subscriptions,
        teste
    }
})