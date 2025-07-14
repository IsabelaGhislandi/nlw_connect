
import { redis } from "../redis/client";

interface GetSubscriberInviteCountParams {
   subscriberId: string
}

export async function getSubscriberInviteCount({subscriberId }: GetSubscriberInviteCountParams) {
   //z-score -> sorted sets -> pegar a pontuação do referral
   const count = await redis.zscore('referral:ranking', subscriberId)
   return { count: count ? Number.parseInt(count) : 0 }
   
}
 