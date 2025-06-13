
import { z } from 'zod'
import { FastifyPluginAsyncZod} from "fastify-type-provider-zod"

export const subsceribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
        app.post('/subscription', {
        schema: {
            summary: 'Subscribes someon to the Event',
            tags: ['subscription'],
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                telephone: z.coerce.number().optional()
            }),
            response: {
                201: z.object({
                    name: z.string(),
                    email: z.string(),
                    telephone: z.coerce.number().optional()
                })
            }
        },
    },
        async (request, reply) => {
            const { name, email, telephone } = request.body
            //criação no bd
            return reply.status(201).send({
                name, email, telephone
        })
    }) 

}