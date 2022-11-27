<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class Login extends mixins(mix) {
  messageProcess: string = ''
  snackbar: boolean = false

  created () {
    this.$nuxt.$on('messageProcess', (message: string) => {
      this.messageProcess = message
      this.snackbar = true
    })
  }
}
</script>
<template>
  <v-app dark>
    <v-row>
      <v-col v-show="nosm" class="img-auth" />
      <v-col>
        <v-container>
          <div class="d-flex mb-10" :class="nosm ? 'flex-row-reverse' : 'flex-row mb-6'">
            <img src="~/assets/logo.png" alt="" width="200" @click="openMenu('/')">
          </div>
          <Nuxt :message-process="messageProcess" @messageProcess="messageProcess = $event" />
          <div class="d-flex justify-center pink--text">
            Copyright &copy; {{ years }} Tim SIKMEN Dicoding
          </div>
        </v-container>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ messageProcess }}
      <template #action="{attrs}">
        <v-btn text color="pink" v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
