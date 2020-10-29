import { HomeStatistic } from './home-statistic'
import { HomeWeather } from './home-weather'

import { HomeStatisticPie } from './home-statistic-pie'
import { HomeInventory } from './home-statistic-inventory'

export const homeConfig = {
    statistic: {
        component: HomeStatistic,
        permission: 'home:<.*>|home:statistics',
        show: false,
    },
    map: {
        component: HomeWeather,
        permission: 'home:<.*>|home:map',
        show: false,
    },
    chart: {
        component: HomeWeather,
        permission: 'home:<.*>|home:stability',
        show: false,
    },
    weather: {
        component: HomeWeather,
        permission: 'home:<.*>|home:weather',
        show: false,
    },
    gateway: {
        component: HomeWeather,
        permission: 'home:<.*>|home:statistics_device',
        show: false,
    },
    calendar: {
        component: HomeWeather,
        permission: 'home:<.*>|home:abnormal|home:calendar',
        show: false,
    },
}

export const statisticConfig = [
    {
        title: (window as any).language.inventory,
        component: HomeInventory,
        permission: 'pasture:<.*>|pasture:pandian',
    },
    {
        title: (window as any).language.gender_ratio,
        component: HomeStatisticPie,
    },
    {
        title: (window as any).language.breeding,
        component: HomeStatisticPie,
    },
    {
        title: (window as any).language.immune,
        permission: 'pasture:<.*>|pasture:immunity',
        component: HomeStatisticPie,
    },
    {
        title: (window as any).language.insurance,
        permission: 'pasture:<.*>|pasture:insurance',
        component: HomeStatisticPie,
    },
]
