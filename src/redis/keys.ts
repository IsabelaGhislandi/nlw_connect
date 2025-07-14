import { redis } from './client'

async function main() {
  await redis.del('referral:ranking')
  console.log('Ranking zerado!')
  process.exit(0)
}

main()