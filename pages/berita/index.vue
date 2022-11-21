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
    <v-container class="mt-16">
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
    </v-container>
    <v-container class="my-16">
      <h1 class="font-weight-medium display-1 mb-8">
        Berita Terbaru
      </h1>
      <v-row>
        <v-col v-for="artikel in 6" :key="artikel" :cols="nosm ? '4' : '12'">
          <v-card :height="nosm ? height : ''" :loading="loading">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              />
            </template>
            <v-img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            <v-card-text class="pa-10 black--text">
              <h1 class=" headline font-weight-medium">
                Artikel 1
              </h1>
              <p class="text--disabled body">
                {{ limitText(text, 200) }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
