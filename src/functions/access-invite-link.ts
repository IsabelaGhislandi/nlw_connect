
import { redis } from "../redis/client";

interface accessInviteLinkRouteParams {
   subscriberId: string
}

export async function accessInviteLink({subscriberId }: accessInviteLinkRouteParams) {
    try {
      
      await redis.hincrby('referral:access-count-hash', subscriberId, 1) 
    } catch (err) {
        console.error('Erro ao inserir inscrição:', err);
        throw err;
    }
}
