<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

interface socialMedia {
  title: string
  icon: string
  to: string
}

interface menuRules {
  title: string
  icon: string
  to: string
}

@Component
export default class footerGuest extends mixins(mix) {
  socialMedia: Array<socialMedia> = [
    {
      title: 'Facebook',
      icon: 'mdi-facebook',
      to: '#'
    },
    {
      title: 'Instagram',
      icon: 'mdi-instagram',
      to: '#'
    },
    {
      title: 'Twitter',
      icon: 'mdi-twitter',
      to: '#'
    },
    {
      title: 'Youtube',
      icon: 'mdi-youtube',
      to: '#'
    }
  ]

  menus: Array<menuRules> = [
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
    },
    {
      title: 'Registrasi',
      icon: 'mdi-account-plus',
      to: '/auth/register'
    }
  ]

  moreMe: Array<menuRules> = [
    {
      title: 'Tentang Kami',
      icon: 'mdi-home',
      to: '/'
    },
    {
      title: 'Kontak Kami',
      icon: 'mdi-login',
      to: '/login'
    },
    {
      title: 'Syarat & Ketentuan',
      icon: 'mdi-account-plus',
      to: '/auth/register'
    },
    {
      title: 'Kebijakan Privasi',
      icon: 'mdi-login',
      to: '/auth/login'
    },
    {
      title: 'Hubungi Kami',
      icon: 'mdi-account-plus',
      to: '/register'
    }
  ]

  contactMe: Array<menuRules> = [
    {
      title: 'f482x1005@dicoding.org (Muhammad Haikal Bintang)',
      icon: 'mdi-home',
      to: 'f482x1005@dicoding.org'
    }
  ]

  mailto (email: string) {
    window.location.assign(`mailto:${email}`)
  }
}
</script>

<template>
  <v-content class="bg-pink">
    <v-container class="my-8">
      <v-row>
        <v-col :cols="nosm ? '4' : '12'">
          <img src="~/assets/footerlogo.png">
          <p class="title text--disabled">
            Sikmen adalah sistem perhitungan siklus mentruasi berbasis WEB
          </p>
        </v-col>
        <v-col :cols="nosm ? '6' : '12'" :class="nosm ? 'ml-16 pl-16' : ''">
          <v-row>
            <v-col :cols="nosm ? '' : '6'">
              <p class="headline font-weight-bold">
                Halaman
              </p>
              <p v-for="(menu, i) in menus" :key="i" class="title hover text--disabled" @click="openMenu(menu.to)">
                {{ menu.title }}
              </p>
            </v-col>
            <v-col :cols="nosm ? '' : '6'">
              <p class="headline font-weight-bold">
                Kontak Kami
              </p>
              <p v-for="(contact, i) in contactMe" :key="i" class="title hover text--disabled" @click="mailto(contact.to)">
                {{ contact.title }}
              </p>
              <p class="title hover text--disabled">
                Indonesia
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <div class="d-flex justify-center">
      <p class="title text--disabled my-8">
        Copyright © {{ years }} Tim Sikmen Dicoding. All rights reserved.
      </p>
    </div>
  </v-content>
</template>
