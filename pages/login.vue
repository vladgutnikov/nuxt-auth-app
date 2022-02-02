<template>
  <v-form @submit.prevent="submit" v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-btn type="submit" elevation="2">Login</v-btn>
      </v-row>

      <v-row>
        <v-alert v-if="error" type="error">
          {{ error }}
        </v-alert>
      </v-row>

    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  auth: 'guest',
  name: 'login-page',
  data: () => ({
    valid: false,
    email: '',
    password: '',
    emailRules: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    error: '',
  }),
  methods: {
    submit(): void {
      this.error = ''
      this.$auth.loginWith('local', {
        data: { email: this.email, password: this.password }
      }).then((response) => {
        if (!response) {
          this.error = 'error occurred'
          return
        }
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data
          this.$auth.$storage.setUniversal('token', accessToken)
          return this.$auth.setUserToken(accessToken, refreshToken)
        }
      }).then(() => {
        this.$nuxt.$router.push('/')
      }).catch((err) => {
        this.error = err.message
      })
    }
  },
})
</script>
