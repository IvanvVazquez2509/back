const environment = {
  NODE_PORT: process.env.NODE_PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  JWT_SECRET: process.env.JWT_SECRECT || "jwt_secret",
};

export default environment;
