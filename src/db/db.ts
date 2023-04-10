import { Client, Pool } from 'pg';

export const db = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'rootrs',
	port: 5432,
	database: 'healthshoper',

});


export const dbQuery = {
	query: <T>(text: string, params: T[]) => db.query(text, params),
}
