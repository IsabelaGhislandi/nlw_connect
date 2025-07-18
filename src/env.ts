import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
    //configuração das variaveis ambiente
    PORT: z.coerce.number().default(3333),
    POSTGRES_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    WEB_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)