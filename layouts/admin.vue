<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
import mix from '~/mixins/mix'

@Component
export default class Default extends mixins(mix) {
  @Action('auth/getUser') getUser: any
  @Action('auth/getToken') getToken: any

  created () {
    this.getUsers()
  }

  getUsers () {
    const user = localStorage.getItem('user')
    if (user) {
      const res = JSON.parse(user)
      const users = {
        name: res.name,
        email: res.email
      }
      this.getUser(users)
      this.getToken(res.accesToken)
    }
  }
}
</script>

<template>
  <v-app dark>
    <navigation-admin />
    <v-main>
      <Nuxt keep-alive />
    </v-main>
    <footer-guest />
  </v-app>
</template>
