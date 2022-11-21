import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'calcPeriod', namespaced: true })
export default class CalcPeriod extends VuexModule {
  public period: number = 0

  @Mutation
  public setPeriod (period: number) {
    this.period = period
  }
}
