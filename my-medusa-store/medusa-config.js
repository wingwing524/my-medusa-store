const { loadEnv, defineConfig } = require('@medusajs/framework/utils')
const path = require('path')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: path.join(__dirname, "src/modules/page"),
      options: {},
    },
    {
      resolve: path.join(__dirname, "src/modules/promotional-banner"),
      options: {},
    },
    {
      resolve: path.join(__dirname, "src/modules/favorite"),
      options: {},
    },
  ],
})
