<template>
  <div>
    <v-btn @click="logout">
      Log out
    </v-btn>
    <v-card
      class="mx-auto"
      max-width="400"
      tile
      v-for="user in users"
      :key="user.email"
    >
      <template>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-content>{{ user.email }}</v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import UsersService from '~/services/usersService'
import { User } from '~/types/users'

export default Vue.extend({
  middleware: ['auth'],
  auth: true,
  name: 'home-page',
  data: () => ({
    users: [],
  }),
  async asyncData(ctx: Context): Promise<{ users: Array<User> }> {
    const response: Array<User> = await UsersService.getUsers(ctx.$axios)
    return { users: response }
  },
  methods: {
    logout() {
      const token = this.$auth.$storage.getUniversal('token')
      this.$auth.logout({ data: { token } } ).then(() => {
        this.$auth.$storage.removeUniversal('token')
        this.$auth.refreshTokens()
        this.$nuxt.$router.push('/login')
      })
    },
  }
})
</script>
