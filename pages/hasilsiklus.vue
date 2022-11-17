<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class HasilSiklus extends mixins(mix) {
  dialog:boolean = false
}
</script>
<template>
  <v-app>
    <v-container class="mt-16">
      <div :class="nosm ? 'd-flex': ''">
        <h1 class="display-1 font-weight-bold">
          Siklus Haid
        </h1>
        <p class="title ml-auto">
          Home > Kalkulator > <span class="pink--text">Hasil Haid</span>
        </p>
      </div>
    </v-container>

    <v-container class="mb-16">
      <v-row>
        <v-col :cols="nosm ? '6' : '12'">
          <p class="font-weight-bold">
            Hasil
          </p>
          <v-row>
            <v-col :cols="nosm ? '6' : '12'">
              <v-row>
                <v-col>
                  <v-card class="pa-5 rounded-xl" outlined width="100">
                    <div class="d-flex justify-center">
                      <img src="~/assets/hasilsiklus/blood.png" alt="">
                    </div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-btn color="pink" dark class="rounded-lg font-weight-light">
                    Haid
                  </v-btn>
                  <p class="font-weight-bold mt-5" :class="nosm ? 'caption' : 'body-1'">
                    10 Hari, Siklus 8 hari
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col :cols="nosm ? '6' : '12'">
              <v-row>
                <v-col>
                  <v-card class="pa-5 rounded-xl" outlined width="100">
                    <div class="d-flex justify-center">
                      <img src="~/assets/hasilsiklus/fertz.png" alt="">
                    </div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-btn color="green" dark class="rounded-lg font-weight-light">
                    Masa Subur
                  </v-btn>
                  <p class="font-weight-bold mt-5" :class="nosm ? 'caption' : 'body-1'">
                    02 - 11 November
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="nosm ? '6' : '12'">
              <v-row>
                <v-col>
                  <v-card class="pa-5 rounded-xl" outlined width="100">
                    <div class="d-flex justify-center">
                      <img src="~/assets/hasilsiklus/ovum.png" alt="">
                    </div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-btn color="purple" dark class="rounded-lg font-weight-light">
                    Tidak Subur
                  </v-btn>
                  <p class="font-weight-bold mt-5" :class="nosm ? 'caption' : 'body-1'">
                    18 - 28 November
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col :cols="nosm ? '6' : '12'">
              <v-row>
                <v-col>
                  <v-card class="pa-5 rounded-xl" outlined width="100">
                    <div class="d-flex justify-center">
                      <img src="~/assets/hasilsiklus/fertz2.png" alt="">
                    </div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-btn color="blue" dark class="rounded-lg font-weight-light">
                    Ovulasi
                  </v-btn>
                  <p class="font-weight-bold mt-5" :class="nosm ? 'caption' : 'body-1'">
                    12 - 17 November
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-card outlined class="pa-5 rounded-lg mt-10">
            <p class="title font-weight-bold">
              Informasi Detail
            </p>
            <p class="subtitle mt-5 text--disabled">
              Untuk menghindari kehamilan, Kamu bisa menggunakan kontrasepsi, baik yang sementara (kondom), oral, suntik atau permanen (spiral); menghindari seks di dekat atau pada masa subur, lakukan coitus interuptus atau metode menarik penis tanpa mengeluarkan semen/sperma di dalam vagina pada saat seks. Apabila terjadi hal yang tidak diinginkan (seks pada masa subur, atau keluar semen/sperma di dalam vagina) gunakan pil KB darurat/emergensi, paling lama 72 jam setelah terjadi hal yang tidak dinginkan tersebut, makin cepat penggunaannya makin baik
            </p>
          </v-card>
          <div class="mt-10">
            <v-btn outlined color="pink" class="rounded-lg">
              Tes ulang
            </v-btn>
            <v-btn color="pink" dark class="rounded-lg" @click="dialog = true">
              Simpan Hasil
            </v-btn>
          </div>
        </v-col>
        <v-col :cols="nosm ? '6' : '12'" />
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" :width="nosm ? width/2 : width">
      <v-card class="pa-5">
        <v-card-text>
          <p class="font-weight-bold display-1 black--text mb-10">
            Daftar terlebih dahulu untuk menyimpan hasil siklus haid
          </p>
          <v-btn outlined color="pink" class="rounded-lg" @click="dialog = false">Batal</v-btn>
          <v-btn color="pink" dark class="rounded-lg" @click="openMenu('/auth/register')">Daftar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
