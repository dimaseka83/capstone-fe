<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'

@Component
export default class AdminBerita extends mixins(mix) {
  // Api Berita
  api: string = 'https://sikmennews.herokuapp.com/'
  loading: boolean = false

  toolbar: any = ['bold', 'italic', 'underline', 'strike', '|', 'bulletList', 'orderedList', 'h1', 'h2', 'h3', 'p']

  // Table
  dialog: boolean = false
  form : any = {
    title: '',
    deskripsi: '',
    file: ''
  }

  items: Array<any> = []
  search: string = ''
  headers: any = [
    { text: 'Gambar', value: 'url' },
    { text: 'Judul', value: 'name' },
    { text: 'Deskripsi', value: 'deskripsi' },
    { text: 'Aksi', value: 'aksi' }
  ]

  created () {
    this.initialize()
  }

  async initialize () {
    this.loading = true
    await this.$axios.get(this.api + 'products').then((res: any) => {
      this.items = res.data
    })
    this.loading = false
  }

  async hapus (id: any) {
    this.loading = true
    try {
      await this.$axios({
        method: 'delete',
        url: this.api + 'products/' + id,
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Origin': '*'
        }
      }).then((res: any) => {
        this.initialize()
        this.loading = false
      })
    } catch (error) {
      this.loading = false
    }
  }

  async save () {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const { data } = await this.$axios.$post(this.api + 'products', this.form, config)
    console.log(data)
    this.dialog = false
    this.initialize()
  }
}
</script>
<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table :headers="headers" :items="items" :search="search" :loading="loading" loading-text="Loading... Please wait">
              <template #item.url="{ item }">
                <v-img :src="item.url" width="100" height="100" />
              </template>
              <template #item.aksi="{ item }">
                <v-btn color="primary" class="mr-2">
                  Edit
                </v-btn>
                <v-btn color="error" @click="hapus(item.id)">
                  Hapus
                </v-btn>
              </template>
              <template #no-data>
                <v-btn color="pink" dark>
                  Reset
                </v-btn>
              </template>
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Daftar Berita</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical />
                  <v-spacer />
                  <v-dialog v-model="dialog" max-width="1000px">
                    <template #activator="{ on, attrs }">
                      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Tambah Berita
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Tambah Berita</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field v-model="form.title" label="Judul" />
                            </v-col>
                            <v-col cols="12">
                              <v-tiptap v-model="form.deskripsi" :toolbar="toolbar" />
                            </v-col>
                            <v-col cols="12">
                              <v-file-input v-model="form.file" label="Gambar" />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn color="blue darken-1" text @click="dialog = false">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
