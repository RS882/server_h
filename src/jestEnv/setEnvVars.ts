import { env } from 'process';

env.PORT = `4010`;
env.JWT_ACCESS_SECRET = `test1`;
env.JWT_REFRESH_SECRET = `test2`;
env.PGUSER = `postgres`;
env.PGHOST = `localhost`;
env.PGPASSWORD = `rootrs`;
env.PGDATABASE = `testBase`;
env.PGPORT = `5432`;


