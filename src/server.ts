import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { validatorCompiler, 
    serializerCompiler, 
    jsonSchemaTransform } from "fastify-type-provider-zod"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subsceribeToEventRoute } from "./routes/subscribe-to-event-route"

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

app.register(subsceribeToEventRoute)


app.register(fastifyCors)

app.listen({port: 3333}).then (() => {
    console.log("HTTP server running")
})