<script lang="ts">
import { mixins } from 'nuxt-property-decorator'
import Mix from '~/mixins/mix'

interface menuRules {
  title: string
  icon: string
  to: string
}

export default class NavigationGuest extends mixins(Mix) {
  drawer: boolean = false
  menu: Array<menuRules> = [
    {
      title: 'Beranda',
      icon: 'mdi-home',
      to: '/'
    },
    {
      title: 'Kalkulator',
      icon: 'mdi-login',
      to: '/login'
    },
    {
      title: 'Berita',
      icon: 'mdi-account-plus',
      to: '/register'
    },
    {
      title: 'Masuk',
      icon: 'mdi-login',
      to: '/login'
    }
  ]
}
</script>
<template>
  <div>
    <v-app-bar absolute color="#FFFFFF" elevate-on-scroll scroll-target="#scroll-techniques-7">
      <div v-show="sm">
        <v-app-bar-nav-icon @click="drawer = true" />
      </div>
      <v-toolbar-title>
        <!-- <img src="~/assets/logo.png" width="200"> -->
      </v-toolbar-title>
      <v-spacer />
      <div v-show="nosm">
        <v-btn v-for="(men, i) in menu" :key="'men'+i" text @click="men.to">
          {{ men.title }}
        </v-btn>
        <v-btn
          depressed
          color="pink"
          dark
          class="rounded-lg"
        >
          Daftar Sekarang
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>
