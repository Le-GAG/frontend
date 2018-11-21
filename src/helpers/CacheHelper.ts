/**
 * @author nstCactus
 * @date 2018-10-24 00:19
 */

export interface CacheHelperOptions
{
  ttl?: number,
}

interface CacheHelperValue<V>
{
  value: V,
  expire: number,
}

export default class CacheHelper<K, V>
{
  protected cache: Map<K, CacheHelperValue<V>> = new Map<K, CacheHelperValue<V>>();

  protected defaultTtl: number;

  constructor(options: CacheHelperOptions = {})
  {
    this.defaultTtl = options.ttl || 60;
  }

  public get(key: K): V|undefined
  {
    if (this.isExpired(key)) {
      return undefined;
    }

    return this.cache.get(key)!.value;
  }

  public set(key: K, value: V, ttl?: number)
  {
    if (ttl === undefined) {
      ttl = this.defaultTtl;
    }

    const expire = Date.now() + ttl * 1000;

    this.cache.set(key, {
      value:  value,
      expire: expire,
    });
  }

  public has(key: K)
  {
    return !this.isExpired(key);
  }

  protected isExpired(key: K)
  {
    return !this.cache.has(key)
      || Date.now() > this.cache.get(key)!.expire;
  }
}
