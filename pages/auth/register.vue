<script lang="ts">
import { Component, mixins, Ref, Watch } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'
import { VForm } from 'types'

interface Register {
    name: string
    datebirth: string
    email: string
    phone: string
    password: string
    confPassword: string
}

@Component({
  layout: 'auth'
})
export default class RegisterLayout extends mixins(mix) {
  @Ref('formRegister') readonly form!: VForm

  @Watch('menu')
  onMenuChanged (val: string) {
    val && setTimeout(() => (this.activePicker = 'YEAR'))
  }

  register: Register = {
    name: '',
    datebirth: '',
    email: '',
    phone: '',
    password: '',
    confPassword: ''
  }

  loader: boolean = false

  activePicker: string = ''
  menu: boolean = false
  rules = {
    valid: false,
    name: [
      (v: string) => !!v || 'Nama harus diisi',
      (v: string) => v.length >= 3 || 'Nama minimal 3 karakter'
    ],
    datebirth: [
      (v: string) => !!v || 'Tanggal lahir harus diisi',
      (v: string) => new Date().getFullYear() - new Date(v).getFullYear() >= 10 || 'Umur minimal 10 tahun'
    ],
    email: [
      (v: string) => !!v || 'Email harus diisi',
      (v: string) => /.+@.+\..+/.test(v) || 'Email tidak valid'
    ],
    phone: [
      (v: string) => !!v || 'Nomor telepon harus diisi',
      (v: string) => v.length >= 10 || 'Nomor telepon minimal 10 karakter'
    ],
    password: [
      (v: string) => !!v || 'Password harus diisi',
      (v: string) => v.length >= 6 || 'Password minimal 6 karakter'
    ],
    confPassword: [
      (v: string) => !!v || 'Konfirmasi password harus diisi',
      (v: string) => v.length >= 6 || 'Konfirmasi password minimal 6 karakter',
      (v: string) => v === this.register.password || 'Konfirmasi password tidak sama'
    ]
  }

  async registerProcess () {
    if (this.form.validate()) {
      try {
        this.loader = true
        await this.$axios.$post('/users', this.register).then((res: any) => {
          this.$nuxt.$emit('messageProcess', res.msg)
          this.loader = false
          this.$router.push('/auth/login')
        })
      } catch (error) {
        return error
      }
    }
  }

  save (date: string) {
    this.register.datebirth = date
  }
}
</script>
<template>
  <v-app>
    <h1 class="font-weight-bold display-2">
      Register
    </h1>
    <p class="font-weight-light mt-5">
      Silahkan isi informasi Anda dibawah ini dengan benar
    </p>

    <v-form ref="formRegister" class="mt-5">
      <v-text-field
        v-model="register.name"
        label="Nama"
        outlined
        dense
        :rules="rules.name"
        class="mt-3"
      />
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="register.datebirth"
            label="Tanggal lahir"
            outlined
            dense
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            :rules="rules.datebirth"
            class="mt-3"
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="register.datebirth"
          color="pink"
          :active-picker.sync="activePicker"
          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="save"
        />
      </v-menu>
      <v-text-field
        v-model="register.email"
        label="Email"
        outlined
        dense
        :rules="rules.email"
        class="mt-3"
      />
      <v-text-field
        v-model="register.phone"
        label="Nomor Telepon"
        outlined
        dense
        prefix="+62"
        :rules="rules.phone"
        class="mt-3"
      />
      <v-text-field
        v-model="register.password"
        label="Password"
        outlined
        dense
        :rules="rules.password"
        type="password"
        class="mt-3"
      />
      <v-text-field
        v-model="register.confPassword"
        label="Konfirmasi Password"
        outlined
        dense
        type="password"
        :rules="rules.confPassword"
        class="mt-3"
      />

      <v-btn
        large
        dark
        color="pink"
        class="mt-5 rounded-lg"
        block
        :loading="loader"
        @click="registerProcess"
      >
        Registrasi
        <template #loader>
          <v-progress-circular indeterminate size="20" color="white" />
        </template>
      </v-btn>
    </v-form>
    <div class="d-flex justify-center">
      <p class="mt-10 font-weight-light">
        Sudah memiliki akun?
        <nuxt-link to="/auth/login" class="pink--text">
          Masuk
        </nuxt-link>
      </p>
    </div>
  </v-app>
</template>
