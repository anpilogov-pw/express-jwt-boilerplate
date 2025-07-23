export type RateLimiterRuleType = {
  endpoint: string;
  rate_limit: {
    time: number;
    limit: number;
  };
};
