<script lang="ts">
import {
  Component,
  mixins
} from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

  @Component
export default class Kalkulator extends mixins(mix) {
  date: String = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  menu1: Boolean = false

  siklusCount: number = 0
  haidCount: number = 0

  siklusOut () {
    this.siklusCount = (this.siklusCount - 7) || 0
  }

  siklusIn () {
    this.siklusCount = (this.siklusCount + 7) || 0
  }

  haidOut () {
    this.haidCount = (this.haidCount - 7) || 0
  }

  haidIn () {
    this.haidCount = (this.haidCount + 7) || 0
  }
}

</script>
<template>
  <v-app>
    <v-container class="mt-16">
      <div :class="nosm ? 'd-flex': ''">
        <h1 class="display-1 font-weight-bold">
          Kalkulator Siklus Haid
        </h1>
        <p class="title ml-auto">
          Home > <span class="pink--text">Kalkulator</span>
        </p>
      </div>
    </v-container>

    <v-container class="mb-16">
      <p class="text--disabled subtitle">
        Gunakan fitur ini untuk mengetahui siklus haid dan massa subur kamu.
        Carannya isi tanggal hari pertama dan terkahir kamu haid, lalu isi lama siklus haid(Siklus haid adalah lamanya
        haid dari 1 bulan ke bulan selanjutnya.), lalu isi Berapa lama kamu haid( biasanya berlangsung 2-7 hari.)
        Setelah itu klik tombol “Hitung Sekarang”
      </p>
    </v-container>

    <v-container :class="nosm ? '' : 'px-5'">
      <v-row>
        <v-col :cols="nosm ? '4' : '12'">
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
              :max="max"
              @input="menu1 = false"
            />
          </v-menu>
        </v-col>
        <v-col :cols="nosm ? '4' : '12'">
          <p>2. Berapa lama siklus haid anda (Hari)</p>
          <v-slider
            v-model="siklusCount"
            color="pink"
            append-icon="mdi-plus"
            prepend-icon="mdi-minus"
            thumb-color="pink"
            thumb-label
            @click:append="siklusIn"
            @click:prepend="siklusOut"
          />
        </v-col>
        <v-col :cols="nosm ? '4' : '12'">
          <p>3. Berapa lama Anda Haid (Hari)</p>
          <v-slider
            v-model="haidCount"
            color="pink"
            append-icon="mdi-plus"
            prepend-icon="mdi-minus"
            thumb-color="pink"
            thumb-label
            @click:append="haidIn"
            @click:prepend="haidOut"
          />
        </v-col>
      </v-row>
      <div class="d-flex" :class="nosm ? 'justify-end' : 'justify-start'">
        <v-btn v-if="nosm" color="pink" large class="px-5 rounded-lg" dark>
          Hitung Sekarang
        </v-btn>
        <v-btn v-else color="pink" class="px-5 rounded-lg" dark>
          Hitung Sekarang
        </v-btn>
      </div>
    </v-container>
  </v-app>
</template>
