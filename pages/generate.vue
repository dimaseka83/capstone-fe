<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import moment from 'moment'

@Component({
  layout: 'blankPage'
})
export default class Generate extends Vue {
  mounted () {
    if (!this.$store.state.calc.haid) {
      this.$router.push('/kalkulator')
    } else {
      window.print()
    }
  }

  moment (date: string) {
    return moment(date).lang('id').format('LL')
  }

  getDifferenceDays (date1: string, date2: string) {
    const diffTime = Math.abs(new Date(date2).getTime() - new Date(date1).getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}
</script>
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card flat>
            <v-card-title>
              <h2 class="headline mb-0">
                Tentang Siklus Anda
              </h2>
            </v-card-title>
            <v-card-text class="black--text">
              <v-row>
                <v-col>
                  <p>Nama Anda</p>
                </v-col>
                <v-col>
                  <p>{{ $store.state.auth.user.name }}</p>
                </v-col>
              </v-row>
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Masa
                      </th>
                      <th class="text-left">
                        Tanggal Awal
                      </th>
                      <th class="text-left">
                        Tanggal Akhir
                      </th>
                      <th class="text-left">
                        Jumlah Akhir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in $store.state.calc.hasilPerhitungan" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ moment(item.start) }}</td>
                      <td>{{ moment(item.end) }}</td>
                      <td>{{ getDifferenceDays(item.start, item.end) }} Hari</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
