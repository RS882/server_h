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