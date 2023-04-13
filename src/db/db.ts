import { Client, Pool } from 'pg';
import { env } from 'process';

export const db = new Pool({
	host: env.PGHOST,
	user: env.PGUSER,
	password: env.PGPASSWORD,
	port: +env.PGPORT!,
	database: env.PGDATABASE,

});


export const dbQuery = {
	query: <T>(text: string, params: T[]) => db.query(text, params),
}


