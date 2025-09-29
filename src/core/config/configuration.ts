
export default () => ({
  baseUrl: process.env.BASE_URL,
  serverIp: process.env.SERVER_IP,
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: +process.env.JWT_EXPIRES_IN,
    refreshTokenExpiresIn: +process.env.JWT_REFRESH_EXPIRES_IN,
    saltOrRounds: 10
  }
});
