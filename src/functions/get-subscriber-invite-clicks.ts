
import { redis } from "../redis/client";

// tb vai receber o id
interface GetSubscriberInviteClicksParams {
   subscriberId: string
}

export async function getSubscriberInviteClicks({subscriberId }: GetSubscriberInviteClicksParams) {
   //usar o hash aqui pra pegar o count
    //quantos acessos o subscriberId teve
    //redis nao salva numero apenas string
    //QUANTOS ACESSOS O SUBSCRIBER ID TEVE
   const count = await redis.hget('referral:access-count-hash', subscriberId)
   return { count: count ? Number.parseInt(count) : 0 }
   
}
 