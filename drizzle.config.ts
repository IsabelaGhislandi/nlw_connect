import type { Config } from 'drizzle-kit';

export default {
    schema: './src/drizzle/tables',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
       host: 'localhost',  
       user: 'docker',     
       password: 'docker', 
       database: 'connect', 
       port: 5432,
    }
} satisfies Config;
