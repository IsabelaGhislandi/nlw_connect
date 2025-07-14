import { eq } from 'drizzle-orm'
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/tables/subscriptions"
import { redis } from "../redis/client";

interface SubscribeToEventParams {
    name: string
    email: string
    telephone: number
    //id do do usuario que convidou este usuario para participar ndo evento
    //se o usuario nao tiver sido convidado, o id vai ser null
    referrerId?: string | null
}

export async function subscribeToEvent({ name, email, telephone, referrerId }: SubscribeToEventParams) {
    try {

        //Buscar no banco se nao tenho um inscrito com esse mesmo email
        //buscar em subscriptions um usuario que tenha o memsmo email q estou recebendo
        //No drizzle tem uma funcionalidade equal para verificar se é igual, porem muitas outras funcoes como greater than, lower than, like, ilike etc
        const subscribers = await db.select().from(subscriptions)
        .where(eq(subscriptions.email, email ))

        //encontrou um subscriber com esse mesmo email
        if (subscribers.length > 0) {
            //retor{no um objeto
            //quando tentar se escrever, nao da erro, reaproiveiatr a isncrição dele anterior, aproveitando o mesmo id. caso tenha se esquecido que ja se cadastrou ele pode so se cadastrar de novo e vai ser redirecionado pra pagina de indicação do evento 
            return { subscriberId: subscribers[0].id}
        }

        const result = await db.insert(subscriptions).values({
            name,
            email,
            telephone: String(telephone) 
        }).returning({ id: subscriptions.id });
        
        console.log('Valor recebido em referrerId:', referrerId)
        //depois q inseriu no bancoi
        if(referrerId) {
            //sorted sets do redis versao incremetal
            //sorted set aplica uma ordenação automática nos membros  que for sendo inseridos
            //zincrby -> zset increment by, vai incrementar o valor de um membro na estrutura sorted set
           
            //id do referrerId, quem vai pontuar é quem convidou, vai começar a ordeenar pro ranking qm tem mais fica no topo
            await redis.zincrby('referral:ranking', 1, referrerId);
        }

        const subscriber = result[0];
        return {
            subscriberId: subscriber.id
        };
    } catch (err) {
        console.error('Erro ao inserir inscrição com zin:', err);
        throw err;
    }
}
