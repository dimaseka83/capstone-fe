<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'
import { VForm } from 'types'

interface password {
    password: string
    password_confirmation: string
}

@Component({
  layout: 'auth'
})
export default class LupaPassword extends mixins(mix) {
    @Ref('formPassword') readonly form!: VForm

    password: password = {
      password: '',
      password_confirmation: ''
    }

    rules = {
      valid: false,
      password: [
        (v: string) => !!v || 'Password harus diisi',
        (v: string) => v.length >= 6 || 'Password minimal 6 karakter'
      ],
      password_confirmation: [
        (v: string) => !!v || 'Konfirm password harus diisi',
        (v: string) => v.length >= 6 || 'Konfirm password minimal 6 karakter',
        (v: string) => v === this.password.password || 'Konfirm password tidak sama'
      ]
    }

    submit () {
      if (this.form.validate()) {
        alert('Berhasil')
      }
    }
}

</script>
<template>
  <v-app>
    <h1 class="font-weight-bold display-2">
      Buat Password Baru
    </h1>
    <p class="font-weight-light mt-5">
      Masukkan password baru Anda, pastikan terdiri minimal 8 karakter
    </p>

    <v-form
      ref="formPassword"
      class="mt-10"
      lazy-validation
    >
      <v-text-field
        v-model="password.password"
        label="Password"
        outlined
        dense
        :rules="rules.password"
        class="mt-5"
        type="password"
      />
      <v-text-field
        v-model="password.password_confirmation"
        label="Konfirmasi Password"
        outlined
        dense
        :rules="rules.password_confirmation"
        class="mt-5"
        type="password"
      />
      <v-btn
        large
        dark
        color="pink"
        class="mt-5 rounded-lg"
        block
        @click="submit"
      >
        Ubah Password
      </v-btn>
    </v-form>
  </v-app>
</template>
