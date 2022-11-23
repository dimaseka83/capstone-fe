import { Action } from 'vuex-class'
import moment from 'moment'
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class MixPeriod extends Vue {
  [x: string]: any
@Action('calc/getPerhitungan') getPerhitungan: any
  @Action('calc/getHaid') getHaid: any
  @Action('calc/resetPerhitungan') resetPerhitungan: any

  loading: boolean = false

  date: string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  menu1: Boolean = false

  siklusCount: number = 21
  haidCount: number = 2

  siklusOut () {
    this.siklusCount = (this.siklusCount - 1) || 0
  }

  siklusIn () {
    this.siklusCount = (this.siklusCount + 1) || 0
  }

  haidOut () {
    this.haidCount = (this.haidCount - 1) || 0
  }

  haidIn () {
    this.haidCount = (this.haidCount - 1) || 0
  }

  calcNow () {
    this.loading = true
    this.resetPerhitungan()
    const periodCycleDays = this.siklusCount
    const bleedingDays = this.haidCount
    const fertilePhaseStart = periodCycleDays - 20
    const fertilePhaseEnd = periodCycleDays - 11
    const ovulation = (fertilePhaseStart - 1) + (fertilePhaseEnd - fertilePhaseStart) / 2

    const periodStartDate = new Date(this.date)

    const addDays = (date: Date, days: number) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    const createEventsForDate = (date: Date) => {
      const timeBetween = Math.abs(date.getTime() - periodStartDate.getTime())
      const daysBetween = Math.ceil(timeBetween / (1000 * 3600 * 24))
      const cyclesBetween = Math.floor(daysBetween / periodCycleDays)
      const weekCycleFertile = Math.floor(periodCycleDays - 7)
      const events = []

      for (let i = 0; i < 1; i++) {
        const cycyleDaysBetween = periodCycleDays * (cyclesBetween)
        const p = addDays(periodStartDate, cycyleDaysBetween)
        const bleedingEnd = addDays(p, bleedingDays)
        const proliferativeStart = addDays(bleedingEnd, 1)
        const proliferativeEnd = addDays(proliferativeStart, 7)
        const fertilePhaseStartDate = addDays(proliferativeEnd, 1)
        const fertilePhaseEndDate = addDays(fertilePhaseStartDate, weekCycleFertile)
        const ovulationDayStart = addDays(proliferativeEnd, 7)
        const ovulationDayEnd = addDays(ovulationDayStart, 3)

        events.push({
          name: 'Haid',
          start: moment(p).format('YYYY-MM-DD'),
          end: moment(bleedingEnd).format('YYYY-MM-DD'),
          color: 'red',
          timed: true
        })
        events.push({
          name: 'Fase Tidak Subur',
          start: moment(proliferativeStart).format('YYYY-MM-DD'),
          end: moment(proliferativeEnd).format('YYYY-MM-DD'),
          color: 'purple',
          timed: true
        })
        events.push({
          name: 'Fase subur',
          start: moment(fertilePhaseStartDate).format('YYYY-MM-DD'),
          end: moment(fertilePhaseEndDate).format('YYYY-MM-DD'),
          color: 'green',
          timed: true
        })
        events.push({
          name: 'Hari ovulasi',
          start: moment(ovulationDayStart).format('YYYY-MM-DD'),
          end: moment(ovulationDayEnd).format('YYYY-MM-DD'),
          color: 'blue',
          timed: true
        })
      }
      const haid = this.haidCount
      const siklus = this.siklusCount
      this.getPerhitungan(events)
      this.getHaid({ haid, siklus })
      this.openMenu('/hasilsiklus')
    }
    return createEventsForDate(periodStartDate)
  }
}
