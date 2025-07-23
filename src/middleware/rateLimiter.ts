import { NextFunction, Request, Response } from 'express';
import { getClientIp } from 'request-ip';
import { RateLimiterRuleType } from "RateLimiterRuleType";
import redisClient from '../redis';

export const rateLimiter = (rule: RateLimiterRuleType) => {
	const { endpoint, rate_limit } = rule;

	return async (request: Request, response: Response, next: NextFunction) => {
    const ipAddress = getClientIp(request);
    const redisId = `${endpoint}/${ipAddress}`;
    const requests = await redisClient.incr(redisId);
    if (requests === 1) await redisClient.expire(redisId, rate_limit.time);
    if (requests > rate_limit.limit) {
      return response.status(429).send({
        error: {
          msg: 'Too Many Requests',
          code: 'too_many_requests',
        },
        result: null,
      });
    }
    next();
  };
}