<template>
  <section class="auth-sign-in-page hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="box">
              <form class="section" @submit.prevent.stop="submitForm">
                <div class="auth-sign-in-page__validation-message field has-text-weight-bold has-text-danger">
                  <p
                    ref="validationMessage"
                    v-text="authError"
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
                      :disabled="isAuthenticating"
                      autocomplete="username"
                    >
                    <span class="icon is-small is-left"><i class="fa fa-envelope" /></span>
                    <span class="auth-sign-in-page__validation-icon icon is-small is-right has-text-danger"><i class="fa fa-close" /></span>
                  </div>
                </div>

                <div class="field">
                  <label class="label is-medium">Mot de passe</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      v-model="password"
                      class="input is-medium"
                      type="password"
                      required
                      placeholder="Mot de passe"
                      :disabled="isAuthenticating"
                      autocomplete="current-password"
                    >
                    <span class="icon is-small is-left"><i class="fa fa-lock" /></span>
                    <span class="auth-sign-in-page__validation-icon icon is-small is-right has-text-danger"><i class="fa fa-close" /></span>
                  </div>
                </div>

                <button
                  class="auth-sign-in-page__submit-button button is-block is-primary is-medium is-fullwidth"
                  :class="{ 'is-loading': isAuthenticating }"
                  :disabled="isAuthenticating"
                  type="submit"
                >
                  Connexion
                </button>
              </form>
            </div>

            <p class="auth-sign-in-page__footer has-text-centered has-text-grey">
              <router-link :to="{ name: 'pages/join' }"
                           class="has-text-grey has-text-weight-bold"
                           v-text="'Rejoindre le GAG'"
              />
              ·
              <router-link :to="{ name: 'auth/recover-password' }"
                           class="has-text-grey has-text-weight-bold"
                           v-text="'Mot de passe oublié ?'"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, Getter} from 'vuex-class';

  @Component
  export default class AuthSignInPage extends Vue
  {
    email: string          = '';
    password: string       = '';
    authError: string|null = null;
    @Getter('isAuthenticating', {namespace: 'authentication'}) isAuthenticating!: number;
    @Getter('isLoggedIn', {namespace: 'authentication'}) isAuthenticated!: number;
    @Action('authenticate', {namespace: 'authentication'}) authenticate: any;

    async submitForm()
    {
      this.authError = null;

      try {
          await this.authenticate({
              email:    this.email,
              password: this.password,
          });
      } catch (e) {
          this.authError = e.message;
      }

      if (this.isAuthenticated) {
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
    &__validation-message {
      min-height:  25px;
    }

    &__validation-icon {
      display: none;
    }

    input:invalid ~ &__validation-icon {
      display: inline-flex;
    }
  }
</style>
