module.exports = [  
  {
    name: 'default',
    type: 'postgres',
    host: process.env.TYPEORM_PG_HOST,
    port: process.env.TYPEORM_PG_PORT,
    username: process.env.TYPEORM_PG_USER,
    password: process.env.TYPEORM_PG_PASSWORD,
    database: process.env.TYPEORM_PG_DBNAME,
    extra: {
      ssl: true,
    },
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATION],
    cli: {
      migrationsDir: process.env.TYPEORM_ENTITIES_DIR,
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.TYPEORM_MONGODB_HOST,
    port: process.env.TYPEORM_MONGODB_PORT,
    username: process.env.TYPEORM_MONGODB_USER,
    password: process.env.TYPEORM_MONGODB_PASS,
    database: process.env.TYPEORM_MONGODB_DBNAME,
    useUnifiedTopology: true,
    entities: [process.env.TYPEORM_MONGODB_SCHEMAS],
  },
];
