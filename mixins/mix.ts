import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class Mix extends Vue {
  get height () {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 220
      case 'sm': return 400
      case 'md': return 500
      case 'lg': return 600
      case 'xl': return 800
    }
  }

  get nosm () {
    return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
  }

  get sm () {
    return this.$vuetify.breakpoint.xs
  }

  get width () {
    return this.$vuetify.breakpoint.width
  }

  openMenu (menu: string) {
    this.$router.push({ path: menu })
  }
}
