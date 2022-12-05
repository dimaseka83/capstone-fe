<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import moment from 'moment'
import mix from '~/mixins/mix'

@Component
export default class HasilSiklus extends mixins(mix) {
  @Ref('calendar') calendar: any
  dialog:boolean = false
  focus: string = ''
  type = 'month'
  typeToLabel = {
    month: 'Bulan',
    week: 'Minggu',
    day: 'Hari',
    '4day': '4 Hari'
  }

  setToday () {
    this.focus = ''
  }

  prev () {
    this.calendar.prev()
  }

  next () {
    this.calendar.next()
  }

  getEventColor (event: { color: any }) {
    if (event.color) {
      return event.color
    }
  }

  monthName (date: string) {
    return moment(date).format('MMMM')
  }

  moment (date: string) {
    return moment(date)
  }

  calcBetweenDates (start: string, end: string) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const dates = []
    // eslint-disable-next-line no-unmodified-loop-condition
    while (startDate <= endDate) {
      dates.push(moment(startDate).format('YYYY-MM-DD'))
      startDate.setDate(startDate.getDate() + 1)
    }
    let firstDate = dates[0]
    let lastDate = dates[dates.length - 1]
    const splitFirstDate = firstDate.split('-')
    const splitLastDate = lastDate.split('-')
    const firstDateMonth = splitFirstDate[1]
    const lastDateMonth = splitLastDate[1]
    if (firstDateMonth === lastDateMonth) {
      firstDate = splitFirstDate[2]
      lastDate = splitLastDate[2] + ' ' + this.monthName(splitLastDate[1])
    } else {
      firstDate = splitFirstDate[2] + '-' + this.monthName(splitFirstDate[1])
      lastDate = splitLastDate[2] + '-' + this.monthName(splitLastDate[1])
    }
    return firstDate + ' - ' + lastDate
  }

  checkUserLoginOnSimpanHasilSiklus () {
    if (this.$store.state.auth.token) {
      this.openMenu('/generate')
    } else {
      this.dialog = true
    }
  }

  created () {
    if (!this.$store.state.calc.haid) {
      this.openMenu('/kalkulator')
    }
  }
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
        <v-col v-show="sm" :cols="nosm ? '6' : '12'">
          <v-row>
            <v-col>
              <v-sheet>
                <v-toolbar flat>
                  <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                  >
                    Today
                  </v-btn>
                  <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                  >
                    <v-icon small>
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                  >
                    <v-icon small>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                  <v-toolbar-title v-if="calendar">
                    {{ calendar.title }}
                  </v-toolbar-title>
                  <v-spacer />
                  <v-menu
                    bottom
                    right
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        color="grey darken-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>
                          mdi-menu-down
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, i) in Object.keys(typeToLabel)"
                        :key="i"
                        @click="type = item"
                      >
                        <v-list-item-title>{{ typeToLabel[item] }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet :height="nosm ? height : height*2">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="$store.state.calc.hasilPerhitungan"
                  :event-color="getEventColor"
                  :type="type"
                />
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
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
                    <!-- {{ $store.state.calc.haid }} Hari, Siklus {{ $store.state.calc.period }} hari -->
                    {{ calcBetweenDates($store.state.calc.hasilPerhitungan[0].start, $store.state.calc.hasilPerhitungan[0].end) }}
                  </p>
                </v-col>
              </v-row>
            </v-col>

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
                    {{ calcBetweenDates($store.state.calc.hasilPerhitungan[0].start, $store.state.calc.hasilPerhitungan[0].end) }}
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
                      <img src="~/assets/hasilsiklus/fertz.png" alt="">
                    </div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-btn color="green" dark class="rounded-lg font-weight-light">
                    Masa Subur
                  </v-btn>
                  <p class="font-weight-bold mt-5" :class="nosm ? 'caption' : 'body-1'">
                    {{ calcBetweenDates($store.state.calc.hasilPerhitungan[2].start, $store.state.calc.hasilPerhitungan[2].end) }}
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
                    {{ calcBetweenDates($store.state.calc.hasilPerhitungan[3].start, $store.state.calc.hasilPerhitungan[3].end) }}
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
            <v-btn outlined color="pink" class="rounded-lg" @click="openMenu('/kalkulator')">
              Tes ulang
            </v-btn>
            <v-btn color="pink" dark class="rounded-lg" @click="checkUserLoginOnSimpanHasilSiklus">
              Simpan Hasil
            </v-btn>
          </div>
        </v-col>
        <v-col v-show="nosm" :cols="nosm ? '6' : '12'">
          <v-row>
            <v-col>
              <v-sheet>
                <v-toolbar flat>
                  <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                  >
                    Today
                  </v-btn>
                  <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                  >
                    <v-icon small>
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                  >
                    <v-icon small>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                  <v-toolbar-title v-if="calendar">
                    {{ calendar.title }}
                  </v-toolbar-title>
                  <v-spacer />
                  <v-menu
                    bottom
                    right
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        color="grey darken-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>
                          mdi-menu-down
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, i) in Object.keys(typeToLabel)"
                        :key="i"
                        @click="type = item"
                      >
                        <v-list-item-title>{{ typeToLabel[item] }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet :height="nosm ? height : height*2">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="$store.state.calc.hasilPerhitungan"
                  :event-color="getEventColor"
                  :type="type"
                />
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" :width="nosm ? width/2 : width">
      <v-card class="pa-5">
        <v-card-text>
          <p class="font-weight-bold display-1 black--text mb-10">
            Daftar terlebih dahulu untuk menyimpan hasil siklus haid
          </p>
          <v-btn outlined color="pink" class="rounded-lg" @click="dialog = false">
            Batal
          </v-btn>
          <v-btn color="pink" dark class="rounded-lg" @click="openMenu('/auth/register')">
            Daftar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
