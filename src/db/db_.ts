import { Pool } from 'pg';

export const db = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'rootrs',
	port: 5432,
	database: 'healthshoper',

});



// UPDATE tel_number set is_aktive = true where id = 1;
// DELETE FROM tel_number  where id = 1;
// SELECT * FROM tel_number  where id = 1;
// SELECT * FROM tel_number;
// INSERT INTO tel_number(tel_number) values (444444444444);