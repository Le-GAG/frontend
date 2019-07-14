import Cookie from 'js-cookie';

/**
 * @author nstCactus
 * @date 2019-07-14 12:26
 */

export default {
  get length(): number
  {
    console.warn('Not implemented');// eslint-disable-line no-console
    return 0;
  },

  getItem(name: string): string|null
  {
    const value = Cookie.get(name);
    return value ? value : null;
  },

  setItem(name: string, value: string): void
  {
    Cookie.set(name, value, { secure: false });
  },

  clear(): void
  {
    localStorage.clear();
  },

  removeItem(name: string): void
  {
    Cookie.remove(name);
  },

  key(n: number): string|null
  {
    console.warn('Not implemented');// eslint-disable-line no-console
    return null;
  },
};
