import { HttpClient } from '../HttpClient'

class StatisticsServices extends HttpClient {

    constructor() {
        super("https://javidselimov12345.github.io/covidApi");
    }
    getTodaysSummary() {
        return this.get('covid.json')
    }
}

export const statisticsServices = new StatisticsServices();
