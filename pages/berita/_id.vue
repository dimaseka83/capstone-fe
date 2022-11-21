<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class Berita extends mixins(mix) {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  loading: boolean = false
}
</script>
<template>
  <v-app>
    <v-container class="my-16 text-center">
      <p class="text--disabled">
        16 November 2022
      </p>
      <h1 class="font-weight-medium display-2 px-16">
        Tips dan Trik agar menjaga mood saat Menstruasi
      </h1>
      <v-card class="rounded-lg mt-16">
        <v-img
          src="https://picsum.photos/600/300"
          :height="nosm ? height-100 : height"
        />
      </v-card>
    </v-container>
    <v-container>
      <p>
        {{ text }}
      </p>
    </v-container>
  </v-app>
</template>
