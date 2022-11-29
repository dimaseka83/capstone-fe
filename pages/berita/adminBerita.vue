<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import mix from '~/mixins/mix'
import { Underline, Bold, Italic, Strike, TiptapVuetify } from 'typesVuetify'

@Component({
  components: {
    TiptapVuetify
  }
})
export default class AdminBerita extends mixins(mix) {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  loading: boolean = false

  extensions = [
    new Underline(),
    new Bold(),
    new Italic(),
    new Strike()
  ]
}
</script>
<template>
  <v-app>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="text"
          label="Text"
          outlined
          dense
        />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="text"
              label="Text"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12">
            <tiptap-vuetify
              v-model="text"
              :extensions="extensions"
              :options="{
                placeholder: 'Enter text here...'
              }"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-app>
</template>
