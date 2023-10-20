const {PORT, LOG_LEVEL, MONGO_URL, DB_NAME} = process.env;

export const server = {
  port: PORT || 3000,
  logLevel: LOG_LEVEL || 'info'
};

export const mongoConfig = {
  mongoUrl: MONGO_URL,
  dbName: DB_NAME
};
