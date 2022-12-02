<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import moment from 'moment'
import mix from '~/mixins/mix'

@Component
export default class Berita extends mixins(mix) {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  loading: boolean = false

  berita: Array<any> = []
  link: string = 'https://sikmennews.herokuapp.com/products/'

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
    <v-container class="my-16 text-center">
      <p class="text--disabled">
        {{ moment(berita.createdAt) }}
      </p>
      <h1 class="font-weight-medium display-2 px-16">
        {{ berita.name }}
      </h1>
      <v-card class="rounded-lg mt-16">
        <v-img
          :src="berita.url"
          :height="nosm ? height-100 : height"
        />
      </v-card>
    </v-container>
    <v-container>
      <div v-html="berita.deskripsi"></div>
    </v-container>
  </v-app>
</template>
