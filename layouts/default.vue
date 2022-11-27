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
      const data = JSON.parse(user)
      this.getUser(data.name)
      this.getToken(data.accesToken)
    }
  }
}
</script>

<template>
  <v-app dark>
    <navigation-guest />
    <v-main>
      <Nuxt />
    </v-main>
    <footer-guest />
  </v-app>
</template>
