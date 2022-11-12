<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class IndexPage extends mixins(mix) {
  date: String = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  menu1: Boolean = false

  zoom: any = 0

  zoomOut () {
    this.zoom = (this.zoom - 10) || 0
  }

  zoomIn () {
    this.zoom = (this.zoom + 10) || 0
  }
}

</script>
<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col>
          <v-container fluid class="fill-height">
            <h1 class="display-3 text-uppercase font-weight-bold">
              sikmen
            </h1>
            <h4 class="display-3 font-weight-light">
              Sistem kalkulator siklus menstruasi
            </h4>
            <p class="text--disabled body">
              Cek siklus menstruasi kamu dan simpan hasilnnya.
            </p>
            <v-btn color="pink" large class="px-5 rounded-lg" dark>
              Daftar Sekarang
            </v-btn>
          </v-container>
        </v-col>
        <v-col>
          <div class="d-flex align-center">
            <v-card flat>
              <img src="~/assets/womens-home.svg">
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <p>1. Pilih tanggal awal siklus menstruasi kamu</p>
          <v-spacer />
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            />
          </v-menu>
        </v-col>
        <v-col>
          <p>2. Berapa lama siklus haid anda (Hari)</p>
          <v-slider
            v-model="zoom"
            color="pink"
            append-icon="mdi-plus"
            prepend-icon="mdi-minus"
            @click:append="zoomIn"
            @click:prepend="zoomOut"
          />
        </v-col>
        <v-col />
      </v-row>
    </v-container>
  </v-app>
</template>
