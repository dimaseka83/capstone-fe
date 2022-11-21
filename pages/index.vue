<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import mix from '~/mixins/mix'
import Index from '~/store/index'

interface formBantuan {
  nama: string
  email: string
  pesan: string
}

@Component
export default class IndexPage extends mixins(mix) {
  loading: boolean = false
  date: String = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  menu1: Boolean = false

  siklusCount: number = 0
  haidCount: number = 0

  formBantuan: formBantuan = {
    nama: '',
    email: '',
    pesan: ''
  }

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

  calcNow () {
    this.loading = true
    const calcPeriod = getModule(Index, this.$store)
    calcPeriod.setMenstruationAction(this.haidCount, this.siklusCount, this.date)
    // this.$router.push('/hasil')
  }
}

</script>
<template>
  <v-app>
    <v-container class="fill-height mt-16">
      <v-row>
        <v-col v-show="sm">
          <v-card flat>
            <img src="~/assets/womens-home.svg" :width="width-10">
          </v-card>
        </v-col>
        <v-col>
          <v-container fluid class="fill-height">
            <h1 class="display-3 text-uppercase font-weight-bold">
              sikmen
            </h1>
            <h4 class="font-weight-light" :class="nosm ? 'display-3' : 'headline'">
              Sistem kalkulator siklus menstruasi
            </h4>
            <p class="text--disabled" :class="nosm ? 'body' : 'body-2'">
              Cek siklus menstruasi kamu dan simpan hasilnya.
            </p>
            <v-row v-if="nosm" class="ml-1">
              <v-btn color="pink" x-large class="px-5 rounded-lg" dark @click="openMenu('/auth/register')">
                Daftar Sekarang
              </v-btn>
            </v-row>
            <v-btn v-else color="pink" class="px-5 rounded-lg" dark @click="openMenu('/auth/register')">
              Daftar Sekarang
            </v-btn>
          </v-container>
        </v-col>
        <v-col v-show="nosm">
          <div class="d-flex align-center">
            <v-card flat>
              <img src="~/assets/womens-home.svg">
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-content class="bg-pink">
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
        <div class="d-flex justify-center">
          <v-btn
            v-if="nosm"
            color="pink"
            large
            class="px-5 rounded-lg"
            dark
            @click="calcNow"
          >
            Hitung Sekarang
          </v-btn>
          <v-btn v-else color="pink" class="px-5 rounded-lg" dark @click="calcNow">
            Hitung Sekarang
          </v-btn>
        </div>
      </v-container>
    </v-content>
    <v-container class="mt-16">
      <h1 class="font-weight-bold" :class="nosm ? 'text-center display-2' : 'display-1'">
        Berita dan informasi yang Anda butuhkan
      </h1>
      <p class="text--disabled body" :class="nosm ? 'text-center' : ''">
        Berita, Tips dan Trik untuk kamu
      </p>
    </v-container>
    <v-container class="mt-16">
      <v-row>
        <v-col v-for="artikel in 3" :key="artikel" :cols="nosm ? '4' : '12'">
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
      <div class="d-flex justify-center mt-10">
        <v-btn color="pink" large class="px-5 rounded-lg" dark>
          Lihat Semua
        </v-btn>
      </div>
    </v-container>
    <v-container class="my-16">
      <h1 class="font-weight-bold display-2">
        FAQ - Yang sering ditanyakan
      </h1>
      <p class="text--disabled body mt-5">
        temukan Jawaban kamu disini
      </p>
      <v-row justify="center" class="mt-10">
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="faq in 3"
            :key="faq"
          >
            <v-expansion-panel-header class="font-weight-bold headline">
              Apa itu sikmen?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text--disabled">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc ut aliquam tincidunt, nunc elit aliquam mauris,
              vitae ultricies nisl nunc vel mauris. Sed euismod, nunc ut
              aliquam tincidunt, nunc elit aliquam mauris, vitae ultricies
              nisl nunc vel mauris.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>

    <v-container class="fill-height my-16">
      <v-row>
        <v-col v-show="sm">
          <img src="~/assets/message-home.svg" :width="width-10">
        </v-col>
        <v-col :cols="nosm ? '6' : '12'">
          <h1 class="font-weight-bold display-2">
            Bantuan Lebih Lanjut
          </h1>
          <p class="text--disabled body mt-5 mb-16">
            Berita, Tips dan Trik untuk kamu
          </p>
          <v-text-field
            v-model="formBantuan.nama"
            label="Nama Lengkap"
            outlined
          />
          <v-text-field
            v-model="formBantuan.email"
            label="Email"
            outlined
          />
          <v-textarea
            v-model="formBantuan.pesan"
            label="Pesan"
            outlined
          />
          <v-btn color="pink" large class="px-5 rounded-lg" dark>
            Kirim
          </v-btn>
        </v-col>
        <v-col v-show="nosm">
          <img src="~/assets/message-home.svg">
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
