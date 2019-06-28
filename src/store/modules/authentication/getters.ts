import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthenticationState } from '@/store/modules/authentication/types';

export const getters:GetterTree<AuthenticationState, RootState> = {
  authToken:        (state:AuthenticationState) => state.token,
  isAuthenticating: (state:AuthenticationState) => state.isPending,
  isLoggedIn:       (state:AuthenticationState) => state.token != null,
  errorMessage:     (state:AuthenticationState) => state.error,
};
