import { z } from 'zod'
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { subscribeToEvent } from '../functions/subscribe-to-event'

const subscribeBody = z.object({
  name: z.string(),
  email: z.string().email(),
  telephone: z.number(),
  //pode ser string, ou nulo ou undefined
  referrer: z.string().nullish(),
})

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/subscription', {
    schema: {
      summary: 'Subscribes someone to the Event',
      tags: ['subscription'],
      body: subscribeBody,
      response: {
        201: z.object({
          subscriberId: z.string(),
        })
      }
    },
  }, async (request, reply) => {
    const { name, email, telephone, referrer } = request.body
    const { subscriberId } = await subscribeToEvent({ name, email, telephone, referrerId: referrer,  })
    
    return reply.status(201).send({ subscriberId })
  })
}
