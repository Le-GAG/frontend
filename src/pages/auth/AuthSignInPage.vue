<template>
  <section class="auth-sign-in-page hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="box">
              <form class="section" @submit.prevent.stop="submitForm">
                <div class="auth-sign-in-page__validation-message field">
                  <p
                    ref="validationMessage"
                    v-text="errorMessage"
                  />
                </div>

                <div class="field">
                  <label class="label is-medium">Adresse e-mail</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      v-model="email"
                      class="input is-medium"
                      type="email"
                      required
                      placeholder="Adresse e-mail"
                    >
                    <span class="icon is-small is-left"><i class="fa fa-envelope" /></span>
                    <span class="auth-sign-in-page__validation-icon icon is-small is-right"><i class="fa fa-close" /></span>
                  </div>
                </div>

                <div class="field">
                  <label class="label is-medium">Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      v-model="password"
                      class="input is-medium"
                      type="password"
                      required
                      placeholder="Mot de passe"
                    >
                    <span class="icon is-small is-left"><i class="fa fa-lock" /></span>
                    <span class="auth-sign-in-page__validation-icon icon is-small is-right"><i class="fa fa-close" /></span>
                  </div>
                </div>

                <div class="auth-sign-in-page__remember-me field">
                  <label class="checkbox">
                    <input v-model="rememberMe" type="checkbox">
                    Se souvenir de moi
                  </label>
                </div>

                <button
                  class="auth-sign-in-page__submit-button button is-block is-primary is-medium"
                  :class="{ 'is-loading': isAuthenticating }"
                  type="submit"
                >
                  Connexion
                </button>
              </form>
            </div>

            <p class="auth-sign-in-page__footer has-text-centered has-text-grey">
              <router-link :to="{ name: 'auth/sign-up' }">Inscription</router-link>
              ·
              <router-link :to="{ name: 'auth/recover-password' }">Mot de passe oublié ?</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component
  export default class AuthSignInPage extends Vue
  {
    email: string       = '';
    password: string    = '';
    rememberMe: boolean = false;

    get isAuthenticating()
    {
      return this.$store.getters.isAuthenticating;
    }

    get errorMessage()
    {
      return this.$store.getters.errorMessage;
    }

    async submitForm()
    {
      await this.$store.dispatch('authenticate', {
        email:         this.email,
        password:      this.password,
        stayConnected: this.rememberMe,
      });

      if (this.$store.getters.isLoggedIn) {
        this.$router.push('/');
      } else {
        this.shakeForm();
      }
    }

    shakeForm()
    {
      // TODO: Animate the form to indicate sign-in failure
    }
  }
</script>


<style scoped lang="scss">
  @import '~bulma/sass/utilities/initial-variables';
  @import '~bulma/sass/utilities/derived-variables';

  .auth-sign-in-page {
    &__remember-me {
      margin: 1.5rem 0;
    }

    &__submit-button {
      width: 100%;
    }

    &__footer {
      font-weight: bold;

      a {
        color: inherit;
      }
    }

    &__validation-message {
      min-height:  25px;

      color:       $danger;
      font-weight: bold;
    }

    &__validation-icon {
      display: none;
    }

    input:invalid ~ &__validation-icon {
      display: inline-flex;

      color:   $danger !important;
    }
  }
</style>
