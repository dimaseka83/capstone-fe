<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class IndexPage extends mixins(mix) {
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
    <v-container class="fill-height mt-16">
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
    <v-content class="bg-pink">
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
          <v-col>
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
        <div class="d-flex justify-center">
          <v-btn color="pink" large class="px-5 rounded-lg" dark>
            Hitung Sekarang
          </v-btn>
        </div>
      </v-container>
    </v-content>
    <v-container class="mt-16">
      <h1 class="font-weight-bold display-2 text-center">
        Berita dan informasi yang Anda butuhkan
      </h1>
      <p class="text-center text--disabled body">
        Berita, Tips dan Trik untuk kamu
      </p>
    </v-container>
    <v-container class="mt-16">
      <v-row>
        <v-col v-for="artikel in 3" :key="artikel" cols="4">
          <v-card :height="height" width="500">
            <v-img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            <v-card-text class="pa-10 black--text">
              <h1 class=" headline font-weight-medium">
                Artikel 1
              </h1>
              <p class="text--disabled body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc ut aliquam tincidunt, nunc elit aliquam mauris,
                vitae ultricies nisl nunc vel mauris. Sed euismod, nunc ut
                aliquam tincidunt, nunc elit aliquam mauris, vitae ultricies
                nisl nunc vel mauris.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<style>
.bg-pink{
  background-color: #FFF9FB;
}
</style>
