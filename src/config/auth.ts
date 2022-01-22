interface IJwtConfig {
  secret: string;
  expiresIn: string;
}

export default {
  secret: (process.env.JWT_SECRET as string) ?? 'my_ultra_secret_key',
  expiresIn: '1d',
} as IJwtConfig;
