import { redis } from '../redis/client'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'
import { inArray } from 'drizzle-orm'
//essa função vai retornar os 3 usuários que mais pontuaram
export async function getRanking() {
    //o withscores mostra o usuario e a pontuação
    const ranking = await redis.zrevrange('referral:ranking', 0, 9, 'WITHSCORES')
    //tipando usuarioo
    //gravar id do suuario -> pontos
    const subscriberIdAndScore : Record<string, number> = {}
    //a cada 2 é m usuario
    for (let i = 0; i < ranking.length; i+= 2){
        subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
    }
    console.log(Object.keys(subscriberIdAndScore))
    //buscar os dados do usuário que estão faltando. Retorno do Postgres
    const subscribers = await db.select().from(subscriptions)
    .where(inArray(subscriptions.id,  Object.keys(subscriberIdAndScore)))


    const rankingWithScore = subscribers.map(subscriber => {
        return {
            id: subscriber.id,
            name: subscriber.name,
            score: subscriberIdAndScore[subscriber.id]
        }
    })
    //garantir ordenação decrescente
    .sort((sub1, sub2) => sub2.score - sub1.score)

    console.log(rankingWithScore)
    return { rankingWithScore } 
   
}