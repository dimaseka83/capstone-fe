<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
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
  @Action('auth/getUser') getUser: any
  @Action('auth/getToken') getToken: any

  login: login = {
    email: '',
    password: ''
  }

  loader: boolean = false

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
        this.loader = true
        await this.$axios.$post('/login', this.login).then((res: any) => {
          this.$nuxt.$emit('messageProcess', 'Login berhasil')
          this.getUser(res.name)
          this.getToken(res.accesToken)
          localStorage.setItem('user', JSON.stringify(res))
          this.loader = false
          this.$router.push('/')
        })
      } catch (error) {
        this.$nuxt.$emit('messageProcess', 'Login gagal')
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
        <template #loader>
          <v-progress-circular indeterminate size="20" color="white" />
        </template>
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
