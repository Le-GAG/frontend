/**
 * @author nstCactus
 * @date 2018-10-24 02:36
 */
import {DirectusResponse} from 'directus-sdk-javascript';

export default class DirectusItemFactory
{
  static instantiateCollection<T>(itemClass: {new(data: any): T}, response: DirectusResponse): T[]
  {
    const items:T[] = [];
    response.data.forEach((item: any) => {
      items.push(new itemClass(item));
    });

    return items;
  }

  static instantiateSingleItem<T>(itemClass: {new(data: any): T}, response: DirectusResponse): T|null
  {
    if (response.data.length === 0) {
      return null;
    }

    return new itemClass(response.data[0]);
  }
}
