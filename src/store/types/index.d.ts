/**
 * @author nstCactus
 * @date 20/07/2018 13:48
 */
import {CartState} from '@/store/modules/cart';
import {MenuState} from '@/store/modules/menu';
import {CurrentSaleState} from '@/store/modules/current-sale';
import {AuthenticationState} from '@/store/modules/authentication';

export interface RootState
{
  authentication: AuthenticationState,
  cart: CartState,
  menu: MenuState,
  currentSale: CurrentSaleState,
}
