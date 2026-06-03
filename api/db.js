// Database helper - works both locally and on Vercel
import { createClient } from 'redis';

let client = null;

// Initialize Redis client
async function getRedisClient() {
  if (client && client.isOpen) {
    return client;
  }

  const redisUrl = process.env.REDIS_URL || process.env.KV_URL;

  if (!redisUrl) {
    throw new Error('Redis URL not configured');
  }

  client = createClient({
    url: redisUrl
  });

  client.on('error', (err) => console.error('Redis Client Error:', err));

  await client.connect();
  return client;
}

// Get data from Redis
export async function get(key) {
  try {
    const redis = await getRedisClient();
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis GET error:', error);
    return null;
  }
}

// Set data in Redis
export async function set(key, value) {
  try {
    const redis = await getRedisClient();
    await redis.set(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Redis SET error:', error);
    return false;
  }
}

// For backwards compatibility with @vercel/kv
export const kv = {
  get,
  set
};
