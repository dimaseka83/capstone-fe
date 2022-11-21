import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ name: 'index', namespaced: true, stateFactory: true })
export default class Index extends VuexModule {
  public date: String = ''
  public period: number = 0
  public cycle: number = 0

  @Mutation
  public setMenstruation (period: number, cycle: number, date: String) {
    this.period = period
    this.cycle = cycle
    this.date = date
  }

  @Action
  public setMenstruationAction (period: number, cycle: number, date: String) {
    this.setMenstruation(period, cycle, date)
  }
}
