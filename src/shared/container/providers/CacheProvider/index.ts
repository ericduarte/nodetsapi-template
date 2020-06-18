import { container } from 'tsyringe';

import RedisProvider from './implementations/RedisCacheProvider';
import ICacheProvider from './models/ICacheProvider';

const providers = {
  redis: container.resolve(RedisProvider),
};

container.registerInstance<ICacheProvider>('CacheProvider', providers.redis);
