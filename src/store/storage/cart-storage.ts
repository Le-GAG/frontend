/**
 * @author nstCactus
 * @date 2019-07-13 19:26
 */

export default {
  get length(): number
  {
    return localStorage.length;
  },

  getItem(name: string): string|null
  {
    return localStorage.getItem(name);
  },

  setItem(name: string, value: string): void
  {
    localStorage.setItem(name, value);
  },

  clear(): void
  {
    localStorage.clear();
  },

  removeItem(name: string): void
  {
    localStorage.removeItem(name);
  },

  key(n: number): string|null
  {
    return localStorage.key(n);
  },
};
