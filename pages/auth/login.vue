<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'
import { VForm } from 'types'

interface login {
  email: string
  password: string
}

@Component({
  layout: 'auth'
})
export default class Login extends mixins(mix) {
  @Ref('formLogin') readonly form!: VForm
  login: login = {
    email: '',
    password: ''
  }

  rules = {
    valid: false,
    email: [
      (v: string) => !!v || 'Email harus diisi',
      (v: string) => /.+@.+\..+/.test(v) || 'Email tidak valid'
    ],
    password: [
      (v: string) => !!v || 'Password harus diisi',
      (v: string) => v.length >= 6 || 'Password minimal 6 karakter'
    ]
  }

  async loginProcess () {
    if (this.form.validate()) {
      try {
        await this.$axios.$post('/login', this.login)
      } catch (error) {
        return error
      }
    }
  }
}
</script>
<template>
  <v-app>
    <h1 class="font-weight-bold display-2">
      Login
    </h1>
    <p class="font-weight-light mt-5">
      Silahkan masuk dengan akun SIKMEN anda.
    </p>

    <v-form ref="formLogin" class="mt-10" lazy-validation>
      <v-text-field
        v-model="login.email"
        label="Email"
        outlined
        dense
        :rules="rules.email"
        class="mt-5"
      />
      <v-text-field
        v-model="login.password"
        label="Password"
        type="password"
        outlined
        dense
        :rules="rules.password"
        class="mt-5"
      />
      <div class="d-flex flex-row-reverse">
        <v-btn
          text
          color="pink"
          class="my-1"
          @click="openMenu('/auth/lupapassword')"
        >
          Lupa password?
        </v-btn>
      </div>
      <v-btn
        large
        dark
        color="pink"
        class="mt-5 rounded-lg"
        block
        @click="loginProcess"
      >
        Masuk
      </v-btn>
    </v-form>
    <div class="d-flex justify-center">
      <p class="mt-10 font-weight-light">
        Belum punya akun? Silahkan
        <nuxt-link to="/auth/register" class="pink--text">
          Daftar disini
        </nuxt-link>
      </p>
    </div>
  </v-app>
</template>
