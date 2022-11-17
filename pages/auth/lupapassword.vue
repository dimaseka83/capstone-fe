<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'
import { VForm } from 'types'

interface email {
  email: string
}

@Component({
  layout: 'auth'
})

export default class LupaPassword extends mixins(mix) {
  @Ref('formLupaPassword') readonly form!: VForm
  email: email = {
    email: ''
  }

  rules = {
    valid: false,
    email: [
      (v: string) => !!v || 'Email harus diisi',
      (v: string) => /.+@.+\..+/.test(v) || 'Email tidak valid'
    ]
  }

  lupaPasswordProcess () {
    if (this.form.validate()) {
      alert('Lupa Password berhasil')
    }
  }
}
</script>
<template>
  <v-app>
    <h1 class="font-weight-bold display-2">
      Lupa Password
    </h1>
    <p class="font-weight-light mt-5">
      Silahkan masukkan email anda untuk mereset password.
    </p>

    <v-form ref="formLupaPassword" class="mt-10" lazy-validation>
      <v-text-field
        v-model="email.email"
        label="Email"
        outlined
        dense
        :rules="rules.email"
        class="mt-5"
      />
      <v-btn
        large
        dark
        color="pink"
        class="mt-5 rounded-lg"
        block
        @click="lupaPasswordProcess"
      >
        Kirim
      </v-btn>
    </v-form>
  </v-app>
</template>
