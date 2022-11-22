<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator'
import Mix from '~/mixins/mix'

interface menuRules {
  title: string
  icon: string
  to: string
}

@Component
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
      to: '/kalkulator'
    },
    {
      title: 'Berita',
      icon: 'mdi-account-plus',
      to: '/berita'
    },
    {
      title: 'Masuk',
      icon: 'mdi-login',
      to: '/auth/login'
    }
  ]

  showNotLastMenu (index: number) {
    return index < this.menu.length - 1
  }
}
</script>
<template>
  <div>
    <v-app-bar absolute color="white" elevation="0">
      <v-app-bar-nav-icon v-show="sm" @click="drawer = true" />
      <v-toolbar-title :class="sm ? 'd-flex justify-right' : ''">
        <img src="~/assets/logo.png" width="100">
      </v-toolbar-title>

      <div v-for="(men, i) in menu" v-show="nosm" :key="i">
        <v-btn v-if="showNotLastMenu(i)" text @click="openMenu(men.to)">
          {{ men.title }}
        </v-btn>
      </div>

      <v-spacer />

      <div v-show="nosm">
        <v-btn text @click="openMenu(menu[3].to)">
          {{ menu[3].title }}
        </v-btn>
        <v-btn
          depressed
          color="pink"
          dark
          class="rounded-lg"
          @click="openMenu('/auth/register')"
        >
          Daftar Sekarang
        </v-btn>
      </div>

      <v-navigation-drawer v-model="drawer" absolute temporary app>
        <v-list nav dense>
          <v-list-item-group>
            <img src="~/assets/logo.png" width="100" class="ml-5">
            <v-list-item
              v-for="(men, i) in menu"
              :key="i"
              @click="openMenu(men.to)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ men.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-btn
              depressed
              color="pink"
              dark
              class="rounded-lg mt-8"
              @click="openMenu('/auth/register')"
            >
              Daftar Sekarang
            </v-btn>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
  </div>
</template>
