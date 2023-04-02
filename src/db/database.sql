create TABLE tel_number(
	id SERIAL PRIMARY KEY,
	tel_number VARCHAR(12),
	is_aktive BOOLEAN
);

create TABLE city(
	id SERIAL PRIMARY KEY,
	city_name VARCHAR(255),
	is_aktive BOOLEAN
	);

create TABLE request_call(
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(255),
	tel_number VARCHAR(12),
	is_not_processed BOOLEAN
	);

DROP TABLE IF EXISTS tel_number_test;
CREATE TABLE tel_number_test AS TABLE tel_number;
ALTER TABLE tel_number_test RENAME TO tel_number_test1;

TRUNCATE tel_number;

UPDATE tel_number set is_aktive = true where id = 1;
DELETE FROM tel_number  where id = 1;
SELECT * FROM tel_number  where id = 1;
 SELECT * FROM tel_number;
INSERT INTO tel_number(tel_number, is_aktive) values ('098098098098',true);

SELECT tel_number FROM tel_number;


create TABLE tel_number(
	id SERIAL PRIMARY KEY,
	tel_number VARCHAR(12),
	is_aktive BOOLEAN
);
INSERT INTO tel_number(tel_number, is_aktive) values ('000098098098',true);
INSERT INTO tel_number(tel_number, is_aktive) values ('334455667799',true);
INSERT INTO tel_number(tel_number, is_aktive) values ('445566778899',false);
INSERT INTO tel_number(tel_number, is_aktive) values ('227799',true);
INSERT INTO tel_number(tel_number, is_aktive) values ('99887766',false);
INSERT INTO tel_number(tel_number, is_aktive) values ('778899009900',true);
INSERT INTO tel_number(tel_number, is_aktive) values ('111111111111',true);
INSERT INTO tel_number(tel_number, is_aktive) values ('0',true);
INSERT INTO tel_number(tel_number, is_aktive) values ('qweqwer33344',true);


INSERT INTO city (city_name , is_aktive) VALUES
    ( 'Cheese', 9.99),
    ( 'Bread', 1.99),
   ('Milk', 2.99);