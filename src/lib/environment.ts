import envVar from 'env-var';

export const dbHost = envVar.get('DB_HOST').default('localhost').asString();

export const dbPort = envVar.get('DB_PORT').default(5432).asPortNumber();

export const dbName = envVar.get('DB_NAME').default('radar').asString();

export const dbUser = envVar.get('DB_USER').default('radar').asString();

export const dbPassword = envVar.get('DB_PASSWORD').default('radar123').asString();

export const initDb = envVar.get('INIT_DB').default('true').asBool();

export const seedDb = envVar.get('SEED_DB').default('false').asBool();
