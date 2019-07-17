<template>
  <section class="auth-recover-password-page hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="box">
              <form class="section" @submit.prevent.stop="submitForm">
                <div class="auth-recover-password-page__validation-message field">
                  <p v-if="successMessage"
                     class="has-text-weight-bold has-text-success"
                     v-text="successMessage"
                  />
                  <p v-else
                     class="has-text-weight-bold has-text-danger"
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
                      :disabled="isSubmitting"
                      autocomplete="email"
                    >
                    <span class="icon is-small is-left"><i class="fa fa-envelope" /></span>
                    <span class="auth-recover-password-page__validation-icon icon is-small is-right"><i class="fa fa-close" /></span>
                  </div>
                </div>

                <button
                  class="auth-recover-password-page__submit-button button is-block is-primary is-medium is-fullwidth"
                  :class="{ 'is-loading': isSubmitting }"
                  :disabled="isSubmitting"
                  type="submit"
                >
                  Réinitialiser le mot de passe
                </button>
              </form>
            </div>

            <p class="auth-recover-password-page__footer has-text-centered">
              <router-link :to="{ name: 'pages/join' }" class="has-text-grey has-text-weight-bold">Rejoindre le GAG</router-link>
              ·
              <router-link :to="{ name: 'auth/sign-in' }" class="has-text-grey has-text-weight-bold">Connexion</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class AuthRecoverPasswordPage extends Vue
  {
    email: string               = '';
    password: string            = '';
    isSubmitting: boolean       = false;
    successMessage: string|null = null;
    errorMessage: string|null   = null;

    async submitForm()
    {
        this.isSubmitting = true;

        try{
            await this.$directusSdk.requestPasswordReset(this.email);
            this.successMessage = 'Votre demande a bien été prise en compte. Vous recevrez les instructions pour réinitialiser votre mot de passe par email.';
        } catch (e) {
            this.errorMessage = 'Impossible de donner suite à votre demande. Veuillez réessayer plus tard.';
            console.error(e);
        }

        this.isSubmitting = false;
    }
  }
</script>


<style scoped lang="scss">
  // FIXME: Use biulma helpers to style links and message
</style>
