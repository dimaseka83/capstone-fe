<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class Login extends mixins(mix) {
}
</script>
<template>
  <v-app dark>
    <v-row>
      <v-col v-show="nosm" class="img-auth" />
      <v-col>
        <v-container>
          <div class="d-flex mb-10" :class="nosm ? 'flex-row-reverse' : 'flex-row mb-6'">
            <img src="~/assets/logo.png" alt="" width="200">
          </div>
          <Nuxt />
          <div class="d-flex justify-center pink--text">
            Copyright &copy; {{ years }} Tim SIKMEN Dicoding
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>
