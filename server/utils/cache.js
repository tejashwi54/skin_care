const { redisClient } = require("./redis");
const logger = require("./logger");

const PRODUCT_CACHE_PREFIX = "products:";

// Get cache
const getCache = async (key) => {
  try {
    if (!redisClient.isReady) {
      return null;
    }

    const value = await redisClient.get(key);

    if (value) {
      logger.info(`Redis cache HIT: ${key}`);
    } else {
      logger.info(`Redis cache MISS: ${key}`);
    }

    return value;
  } catch (error) {
    logger.error(`Redis GET failed: ${error.message}`);

    return null;
  }
};

// Set cache
const setCache = async (key, value, ttl = 300) => {
  try {
    if (!redisClient.isReady) {
      return;
    }

    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl,
    });

    logger.info(`Redis cache SET: ${key} | TTL: ${ttl}s`);
  } catch (error) {
    logger.error(`Redis SET failed: ${error.message}`);
  }
};

// Delete specific cache
const deleteCache = async (key) => {
  try {
    if (!redisClient.isReady) {
      return;
    }

    await redisClient.del(key);
  } catch (error) {
    logger.error(`Redis DELETE failed: ${error.message}`);
  }
};

// Invalidate all product-related cache
const invalidateProductCache = async () => {
  try {
    if (!redisClient.isReady) {
      return;
    }

    const keys = [];

    for await (
      const key of redisClient.scanIterator({
        MATCH: `${PRODUCT_CACHE_PREFIX}*`,
        COUNT: 100,
      })
    ) {
      keys.push(key);
    }

    if (keys.length > 0) {
      await redisClient.del(...keys);

      logger.info(
        `Product cache invalidated: ${keys.length} key(s)`
      );
    }
  } catch (error) {
    logger.error(
      `Product cache invalidation failed: ${error.message}`
    );
  }
};

module.exports = {
  PRODUCT_CACHE_PREFIX,
  getCache,
  setCache,
  deleteCache,
  invalidateProductCache,
};