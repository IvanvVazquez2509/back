const database = process.env.DB;

module.exports = {
  development: {
    use_env_variable: "DB_NAME",
    dialect: "mysql",
  },
  test: {},
  production: database
    ? {
        use_env_variable: "DB_NAME",
        dialect: "mysql",
        dialectOptions: {
          ssl: { require: true },
        },
      }
    : {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
      },
};
