<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts">
import { mixins, Component, Ref } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
import mix from '~/mixins/mix'
import mixperiod from '~/mixins/mixperiod'
import { VForm } from 'types'

interface formBantuan {
  name: string
  email: string
  deskripsi: string
}

@Component
export default class IndexPage extends mixins(mix, mixperiod) {
  @Ref('formBantuan') readonly form!: VForm
  @Action('berita/getBerita') getBerita: any
  formBantuan: formBantuan = {
    name: '',
    email: '',
    deskripsi: ''
  }

  rulesFormBantuan: object = {
    name: [
      (v: string) => !!v || 'Nama tidak boleh kosong',
      (v: string) => (v && v.length <= 20) || 'Nama tidak boleh lebih dari 20 karakter'
    ],
    email: [
      (v: string) => !!v || 'Email tidak boleh kosong',
      (v: string) => /.+@.+\..+/.test(v) || 'Email harus valid'
    ],
    deskripsi: [
      (v: string) => !!v || 'Deskripsi tidak boleh kosong',
      (v: string) => (v && v.length <= 100) || 'Deskripsi tidak boleh lebih dari 100 karakter'
    ]
  }

  text: string = ''
  snackbar: boolean = false

  faqs: any = [
    {
      pertanyaan: 'Bagaimana cara kerja program sikmen?',
      jawaban: 'cara kerja sikmen yaitu setiap anda menginputkan siklus anda dibulan yang anda pilih maka aplikasi akan menghitung siklus anda secara otomatis'
    },
    {
      pertanyaan: 'Bagaimana cara menyimpan siklus menstruasi saya?',
      jawaban: 'silahkan anda login jika anda sudah mempunyai akun, jika belum punya silahkan anda register terlebih dahulu, lalu anda dapat klik tombol simpan hasil'
    },
    {
      pertanyaan: 'Apakah hasil Siklus yang telah dihitung akurat?',
      jawaban: 'kita sudah melakukan beberapa survey ke beberapa wanita yang mengalami siklus menstruasi, dan 9 dari 10 wanita menyebutkan bahwasanya perhitungannya sangat akurat'
    }
  ]

  created () {
    this.initialize()
  }

  initialize () {
    if (this.$store.state.berita.berita.length === 0) {
      this.loading = true
      this.getBerita()
      this.loading = false
    }
  }

  get beritathreeonly () {
    return this.$store.state.berita.berita.slice(0, 3)
  }

  async postHelps () {
    if (this.form.validate()) {
      const api = 'https://crudberitadanhelper-production.up.railway.app/'
      const { data } = await this.$axios.post(`${api}help`, this.formBantuan)
      if (data) {
        this.text = 'Pesan berhasil dikirim'
        this.snackbar = true
        this.form.reset()
        this.formBantuan = {
          name: '',
          email: '',
          deskripsi: ''
        }
      }
    }
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

            <v-row v-if="$store.state.auth.token">
              <v-row v-if="nosm" class="ml-1">
                <v-btn color="pink" x-large class="px-5 rounded-lg" dark @click="openMenu('/kalkulator')">
                  Hitung Siklus
                </v-btn>
              </v-row>
              <v-btn v-else color="pink" class="px-5 rounded-lg" dark @click="openMenu('/kalkulator')">
                Hitung Siklus
              </v-btn>
            </v-row>
            <v-row v-else>
              <v-row v-if="nosm" class="ml-1">
                <v-btn color="pink" x-large class="px-5 rounded-lg" dark @click="openMenu('/auth/register')">
                  Daftar Sekarang
                </v-btn>
              </v-row>
              <v-btn v-else color="pink" class="px-5 rounded-lg" dark @click="openMenu('/auth/register')">
                Daftar Sekarang
              </v-btn>
            </v-row>
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
                <v-btn
                  x-large
                  class="px-16 rounded-lg"
                  color="blue"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-calendar-month-outline</v-icon>
                  {{ moment(date) }}
                </v-btn>
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
              :min="21"
              :max="42"
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
              :min="2"
              :max="14"
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
      <p class="text--disabled body mt-3" :class="nosm ? 'text-center' : ''">
        Berita, Tips dan Trik untuk kamu
      </p>
    </v-container>
    <v-container class="mt-16">
      <v-row>
        <v-col v-for="artikel in beritathreeonly" :key="artikel" :cols="nosm ? '4' : '12'">
          <v-hover v-slot="{ hover }">
            <v-card
              :height="nosm ? height : ''"
              :loading="loading"
              :to="`/berita/${artikel.id}`"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                />
              </template>
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
      <div class="d-flex justify-center mt-10">
        <v-btn color="pink" large class="px-5 rounded-lg" dark @click="openMenu('/berita')">
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
            v-for="(faq, idx) in faqs"
            :key="idx"
          >
            <v-expansion-panel-header class="font-weight-bold headline">
              {{ faq.pertanyaan }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text--disabled text-capitalize">
              {{ faq.jawaban }}
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
          <v-form ref="formBantuan" lazy-validation>
            <v-text-field
              v-model="formBantuan.name"
              label="Nama Lengkap"
              outlined
              :rules="rulesFormBantuan.name"
            />
            <v-text-field
              v-model="formBantuan.email"
              label="Email"
              outlined
              :rules="rulesFormBantuan.email"
            />
            <v-textarea
              v-model="formBantuan.deskripsi"
              label="Pesan"
              outlined
              :rules="rulesFormBantuan.deskripsi"
            />
            <v-btn color="pink" large class="px-5 rounded-lg" dark @click="postHelps">
              Kirim
            </v-btn>
          </v-form>
        </v-col>
        <v-col v-show="nosm">
          <img src="~/assets/message-home.svg">
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template #action="{ attrs }">
        <v-btn text color="pink" v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
