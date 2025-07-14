import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { validatorCompiler, 
    serializerCompiler, 
    jsonSchemaTransform } from "fastify-type-provider-zod"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route"
import { accessInviteLinkRoute } from "./routes/access-invite-link-route"
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route"
import { env } from "./env"
import { getSubscriberInviteCountRoute } from "./routes/get-subscriber-invites-count"
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route"
import { getRankingRoute } from "./routes/get-ranking-route"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/hello', () => {
    return 'Hello World!!'
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NLW Connect',
            version: "0.0.1"
        },
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

//Routes
app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.register(fastifyCors)

app.listen({port: env.PORT}).then (() => {
    console.log("HTTP server running")
})