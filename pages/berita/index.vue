<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class Berita extends mixins(mix) {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  loading: boolean = false

  berita: Array<any> = []

  created () {
    this.initialize()
  }

  async initialize () {
    try {
      const { data } = await this.$axios.get('https://sikmennews.herokpp.com/products')
      const urutkanTerbaru = data.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      this.berita = urutkanTerbaru
    } catch (error) {
      return error
    }
  }
}
</script>
<template>
  <v-app>
    <!-- <v-container class="mt-16">
      <h1 class="font-weight-medium display-1 mb-8">
        Berita Popular
      </h1>
      <v-row>
        <v-col :cols="nosm ? '6' : '12'">
          <v-card class="rounded-lg" outlined elevation="1" :height="nosm ? height - 150 : ''">
            <v-img
              src="https://picsum.photos/600/300"
              :height="nosm ? height/2 : height"
            />
            <v-card-title class="font-weight-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </v-card-title>
            <v-card-text>
              {{ limitText(text, 200) }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col :cols="nosm ? '6' : '12'">
          <v-card
            v-for="card in 3"
            :key="card"
            class="rounded-lg mb-4"
            outlined
            elevation="1"
          >
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar tile size="72">
                  <v-img src="https://picsum.photos/600/300" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ limitText(text, 200) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
    <v-container class="my-16">
      <h1 class="font-weight-medium display-1 mb-8">
        Berita Terbaru
      </h1>
      <v-row>
        <v-col v-for="artikel in berita" :key="artikel.id" :cols="nosm ? '4' : '12'">
          <v-hover v-slot="{ hover }">
            <v-card
              :height="nosm ? height : ''"
              :loading="loading"
              :to="`/berita/${artikel.id}`"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img :src="artikel.url" :height="height / 2" />
              <v-card-text class="pa-10 black--text">
                <h1 class=" headline font-weight-medium">
                  {{ artikel.name }}
                </h1>
                <p class="text--disabled body">
                  <span v-html="limitText(artikel.deskripsi, 200)" />
                </p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
