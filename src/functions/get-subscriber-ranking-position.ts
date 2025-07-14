
import { redis } from "../redis/client";

// tb vai receber o id
interface GetSubscribeRankingPositionParams {
   subscriberId: string
}

export async function getSubscriberRankingPosition({subscriberId }: GetSubscribeRankingPositionParams) {

   //(índice)posição de um membro dentro de um sorted set. Retorna posição do usuário.
   const ranking = await redis.zrevrank('referral:ranking', subscriberId)

   if (ranking == null) {
        return { position: null}
   }
   //Para converter índice (que começa em 0) para posição humana (que começa em 1)
   return { position: ranking + 1 }
   
}
 