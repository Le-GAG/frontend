/**
 * @author nstCactus
 * @date 20/07/2018 13:36
 */

export interface AuthenticationState
{
  token:string|null|undefined,
  isPending: boolean,
  error: any,
}
