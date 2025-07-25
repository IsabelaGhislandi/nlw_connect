import { z } from 'zod'
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getRanking } from '../functions/get-ranking';
import { request } from 'http';

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/ranking', {
    schema: {
      summary: 'Get ranking',
      tags: ['referral'],
      //tipando resposta do ranking
      response: {
        200: z.object({
          ranking: z.array(
            //dentro desse array vários objetos
            z.object({
              id: z.string(),
              name: z.string(),
              score: z.number()
            })
          ),
        })
      }
    },
  }, async request => {
    const  { rankingWithScore } = await getRanking()  
    
    return {ranking: rankingWithScore}
  })
}
