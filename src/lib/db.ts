import postgres from 'postgres';

import { dbHost, dbName, dbPassword, dbPort, dbUser } from './environment';

const sql = postgres({
	host: dbHost,
	port: dbPort,
	database: dbName,
	username: dbUser,
	password: dbPassword,
	transform: postgres.camel
});

export default sql;
