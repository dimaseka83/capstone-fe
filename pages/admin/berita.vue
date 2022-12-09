<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
import mix from '~/mixins/mix'
import { VForm } from 'types'

@Component({
  layout: 'admin'
})
export default class AdminBerita extends mixins(mix) {
  @Ref('formBerita') readonly forms!: VForm
  @Action('berita/getBerita') getBerita: any
  // Snack bar
  msg: string = ''
  snackbar: boolean = false

  // Api Berita
  api: string = 'https://crudapi-production.up.railway.app/'
  loading: boolean = false

  toolbar: any = ['bold', 'italic', 'underline', 'strike', '|', 'bulletList', 'orderedList', 'h1', 'h2', 'h3', 'p']

  // Table
  dialog: boolean = false
  form : any = {
    title: '',
    deskripsi: '',
    file: ''
  }

  rules = {
    valid: false,
    title: [
      (v: string) => !!v || 'Judul harus diisi'
    ],
    deskripsi: [
      (v: string) => !!v || 'Deskripsi harus diisi'
    ],
    file: [
      (v: String) => !!v || 'Gambar harus diisi'
    ]
  }

  titleForm: string = 'Tambah Berita'

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

  tambah () {
    this.form = {
      title: '',
      deskripsi: '',
      file: ''
    }
    this.titleForm = 'Tambah Berita'
    this.dialog = true
  }

  initialize () {
    this.loading = true
    this.getBerita()
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
      this.msg = 'Gagal menghapus data'
      this.snackbar = true
    }
  }

  edit (item: any) {
    this.titleForm = 'Edit Berita'
    this.form = {
      id: item.id,
      title: item.name,
      deskripsi: item.deskripsi,
      file: item.image
    }
    this.dialog = true
  }

  async save () {
    if (this.forms.validate()) {
      this.loading = true
      try {
        if (this.titleForm === 'Tambah Berita') {
          const fileMustJpg = this.form.file.name.split('.').pop()
          if (fileMustJpg === 'jpg' || fileMustJpg === 'jpeg' || fileMustJpg === 'png') {
            const formData = new FormData()
            formData.append('title', this.form.title)
            formData.append('deskripsi', this.form.deskripsi)
            formData.append('file', this.form.file)
            await this.$axios({
              method: 'post',
              url: this.api + 'products',
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Allow-Control-Allow-Origin': '*'
              }
            }).then((res: any) => {
              this.initialize()
              this.loading = false
              this.dialog = false
              this.forms.reset()
            })
          }
        } else {
          const formData = new FormData()
          formData.append('name', this.form.title)
          formData.append('deskripsi', this.form.deskripsi)
          formData.append('file', this.form.file)
          await this.$axios({
            method: 'patch',
            url: this.api + 'products/' + this.form.id,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Allow-Control-Allow-Origin': '*'
            }
          }).then((res: any) => {
            this.initialize()
            this.loading = false
            this.dialog = false
            this.forms.reset()
          })
        }
      } catch (error) {
        this.loading = false
        this.msg = 'Gagal menyimpan data'
        this.snackbar = true
      }
    } else {
      this.msg = 'File harus jpg atau png'
      this.snackbar = true
    }
  }
}
</script>
<template>
  <v-app>
    <v-container class="fill-height my-16">
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
            <v-data-table :headers="headers" :items="$store.state.berita.berita" :search="search" :loading="loading" loading-text="Loading... Please wait">
              <template #item.url="{ item }">
                <v-img :src="item.url" width="100" height="100" />
              </template>
              <template #item.deskripsi="{ item }">
                <div v-html="limitText(item.deskripsi, 100)" />
              </template>
              <template #item.aksi="{ item }">
                <v-btn color="primary" class="mr-2" @click="edit(item)">
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
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        @click="tambah"
                      >
                        Tambah Berita
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ titleForm }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form ref="formBerita" lazy-validation>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field v-model="form.title" label="Judul" :rules="rules.title" />
                              </v-col>
                              <v-col cols="12">
                                <v-tiptap v-model="form.deskripsi" :toolbar="toolbar" />
                                <v-text-field v-show="false" v-model="form.deskripsi" label="Deskripsi" :rules="rules.deskripsi" />
                              </v-col>
                              <v-col cols="12">
                                <v-file-input
                                  v-model="form.file"
                                  label="Gambar"
                                  :rules="rules.file"
                                />
                              </v-col>
                            </v-row>
                          </v-form>
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
    <v-snackbar v-model="snackbar">
      {{ msg }}
      <template #action="{ attrs }">
        <v-btn text color="pink" v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
