import { z } from 'zod'
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from "../redis/client";
import { env } from '../env'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/invites/:subscriberId', {
    schema: {
      summary: 'Access invite link and redirects user',
      tags: ['referral'],
      params: z.object({
        subscriberId: z.string()
      }),
      response: {
        302: z.null(),
      },
    },
  }, async (request, reply) => {
    const { subscriberId } = request.params

    await accessInviteLink({ subscriberId})
   // console.log(await redis.hgetall('referral:access-count'))

    console.log(subscriberId)
    const redirectUrl = new URL(env.WEB_URL)
    redirectUrl.searchParams.set('referrer', subscriberId)

    //301 redirect permanente -> browser cria um cachê. Proxima vez vai redirecionar direto para rota de destino. Se o browser cachear vai contabalizar apenas o primeiro click.
    //302 redirect temporário -> browser não cria um cachê. Quando acessar de novo acessar o backend de novo.

    return reply.redirect(redirectUrl.toString(), 302)
  })
}
