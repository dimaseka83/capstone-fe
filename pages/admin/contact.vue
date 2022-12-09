<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'
import { VForm } from 'types'

@Component({
  layout: 'admin'
})
export default class AdminBerita extends mixins(mix) {
  @Ref('formContactUs') readonly forms!: VForm
  // Snack bar
  msg: string = ''
  snackbar: boolean = false

  // Api Contact
  api: string = 'https://crudberitadanhelper-production.up.railway.app/'
  loading: boolean = false
  toolbar: any = ['bold', 'italic', 'underline', 'strike', '|', 'bulletList', 'orderedList', 'h1', 'h2', 'h3', 'p']

  // Table
  dialog: boolean = false
  form : any = {
    name: '',
    email: '',
    deskripsi: ''
  }

  rules = {
    valid: false,
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

  titleForm: string = 'Tambah Berita'

  items: Array<any> = []
  search: string = ''
  headers: any = [
    { text: 'Nama', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Deskripsi', value: 'deskripsi' },
    { text: 'Aksi', value: 'aksi' }
  ]

  created () {
    this.initialize()
  }

  async initialize () {
    this.loading = true
    const { data } = await this.$axios.get(`${this.api}help`)
    this.items = data
    this.loading = false
  }

  async hapus (id: any) {
    this.loading = true
    try {
      await this.$axios({
        method: 'delete',
        url: this.api + 'help/' + id,
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

  tambah () {
    this.form = {
      name: '',
      email: '',
      deskripsi: ''
    }
    this.dialog = true
    this.titleForm = 'Tambah Contact Us'
  }

  edit (item: any) {
    this.titleForm = 'Edit Contact Us'
    this.form = item
    this.dialog = true
  }

  async save () {
    if (this.forms.validate()) {
      try {
        this.loading = true
        if (this.titleForm === 'Tambah Contact Us') {
          const { data } = await this.$axios.post(`${this.api}help`, this.form)
          this.initialize()
          this.dialog = false
          this.loading = false
          this.forms.reset()
        } else {
          const { data } = await this.$axios.patch(`${this.api}help/${this.form.id}`, this.form)
          this.initialize()
          this.dialog = false
          this.loading = false
          this.forms.reset()
        }
      } catch (error) {
        this.loading = false
        this.msg = 'Gagal menyimpan data'
        this.snackbar = true
      }
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
            <v-data-table :headers="headers" :items="items" :search="search" :loading="loading" loading-text="Loading... Please wait">
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
                  <v-toolbar-title>Daftar Contact Us</v-toolbar-title>
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
                        Tambah Contact Us
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ titleForm }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form ref="formContactUs" lazy-validation>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field v-model="form.name" label="Nama" :rules="rules.name" />
                              </v-col>
                              <v-col cols="12">
                                <v-text-field v-model="form.email" label="Email" :rules="rules.email" />
                              </v-col>
                              <v-col cols="12">
                                <v-textarea v-model="form.deskripsi" label="Deskripsi" :rules="rules.deskripsi" />
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
