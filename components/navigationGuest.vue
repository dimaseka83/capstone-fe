<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
import Mix from '~/mixins/mix'

interface menuRules {
  title: string
  icon: string
  to: string
}

@Component
export default class NavigationGuest extends mixins(Mix) {
  @Action('auth/resetUser') resetUser: any
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

  get menuLogin () {
    if (this.$store.state.auth.token) {
      return this.menu.filter((item: menuRules) => item.title !== 'Masuk')
    } else {
      return this.menu
    }
  }

  logout () {
    this.resetUser()
    this.$router.push('/')
    localStorage.removeItem('user')
  }

  disabledButton (link: string) {
    if (link === this.$route.path) {
      return true
    }
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

      <div v-for="(men, i) in menu" v-show="nosm" :key="i+'menu'" class="pl-5">
        <v-btn
          v-if="showNotLastMenu(i)"
          :disabled="disabledButton(men.to)"
          text
          @click="openMenu(men.to)"
        >
          {{ men.title }}
        </v-btn>
      </div>

      <v-spacer />

      <div v-show="nosm">
        <div v-if="$store.state.auth.token">
          <v-menu offset-y>
            <template #activator="{ on }">
              <v-btn text v-on="on">
                <div class="d-flex align-center">
                  <v-avatar size="30" class="mr-2">
                    <img src="https://picsum.photos/32">
                  </v-avatar>
                  <div class="d-flex flex-column text-left">
                    <div class="font-weight-bold">
                      {{ $store.state.auth.user.name }}
                    </div>
                    <div class="font-weight-light overline">
                      {{ $store.state.auth.user.email }}
                    </div>
                  </div>
                </div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div v-else>
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
      </div>

      <v-navigation-drawer v-model="drawer" absolute temporary app>
        <v-list nav dense>
          <v-list-item-group>
            <img src="~/assets/logo.png" width="100" class="ml-5">
            <v-list-item
              v-for="(men, i) in menuLogin"
              :key="i+'menuLogin'"
              :disabled="disabledButton(men.to)"
              @click="openMenu(men.to)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ men.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-btn
              v-if="!$store.state.auth.token"
              depressed
              color="pink"
              dark
              class="rounded-lg mt-8"
              @click="openMenu('/auth/register')"
            >
              Daftar Sekarang
            </v-btn>
            <div v-else>
              <v-menu offset-y>
                <template #activator="{ on }">
                  <v-btn text v-on="on">
                    <div class="d-flex align-center">
                      <v-avatar size="30" class="mr-2">
                        <img src="https://picsum.photos/32">
                      </v-avatar>
                      <div class="d-flex flex-column text-left">
                        <div class="font-weight-bold">
                          {{ $store.state.auth.user.name }}
                        </div>
                        <div class="font-weight-light overline">
                          {{ $store.state.auth.user.email }}
                        </div>
                      </div>
                    </div>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="logout">
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
  </div>
</template>
<style scoped>
button.v-btn[disabled] {
  background-color: #E91E63 !important;
  color: white !important;
}
.v-list-item--disabled {
  background-color: #E91E63 !important;
  color: white !important;
}
</style>
