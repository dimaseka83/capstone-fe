<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import moment from 'moment'
import mix from '~/mixins/mix'

@Component
export default class Berita extends mixins(mix) {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  loading: boolean = false

  berita: Array<any> = []
  link: string = 'https://crudberitadanhelper-production.up.railway.app/products/'

  created () {
    this.initialize()
  }

  async initialize () {
    try {
      const idBerita = this.$route.params.id
      const { data } = await this.$axios.get(`${this.link}${idBerita}`)
      this.berita = data
    } catch (error) {
      return error
    }
  }

  moment (date: string) {
    return moment(date).lang('ID').format('LL')
  }
}
</script>
<template>
  <v-app>
    <v-container class="my-16">
      <v-row>
        <v-col :cols="nosm ? '8' : '10'">
          <h1 class="font-weight-medium" :class="nosm ? 'display-2' : ''">
            {{ berita.name }}
          </h1>
          <v-card class="rounded-lg my-16">
            <v-img
              :src="berita.url"
              :height="nosm ? height-100 : height"
            />
          </v-card>
          <div v-html="berita.deskripsi" />
        </v-col>
        <v-col :cols="nosm ? '4' : '12'">
          <p class="text--disabled">
            <v-avatar
              size="40"
              class="mr-4"
            >
              <img
                alt="Admin"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              >
            </v-avatar>
            Ditulis oleh Admin Sikmen | {{ moment(berita.createdAt) }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
