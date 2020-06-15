/**
 * ApiRegistration interface
 */
export interface ApiRegistration {
  userId: string;
  siteUrl: string;
  turn14Keys: Keys;
  wcKeys: Keys;
}

/**
 * Private interface for UserRegistration
 */
interface Keys {
  client: string;
  secret: string;
}
