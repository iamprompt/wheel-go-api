const configuration = () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGO_URI: process.env.MONGO_URI,
})

export type Config = ReturnType<typeof configuration>

export default configuration
