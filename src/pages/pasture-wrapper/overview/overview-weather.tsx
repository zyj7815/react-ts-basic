import React from 'react'
import { Card } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { getAMapWeather } from '@/utils/weather'

const OverviewWeather: React.FC = props => {
    const [todayWeather, setTodayWeather] = React.useState<any>(null)
    const [weatherList, setWeatherList] = React.useState<any[]>([])
    const [city, setCity] = React.useState<string>('')

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await getAMapWeather()
            console.log(data)
            setTodayWeather(data.forecasts[0])
            setCity(`${data.province}${data.city}`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="pasture-overview-item">
            <Card title={useLanguage.weather}>
                <main className="pasture-overview-weather">
                    {todayWeather && (
                        <section className="pasture-weather__content">
                            <aside className="today-weather-icon">qwdqwd</aside>

                            <div className="today-weather-content">
                                <div>{todayWeather.dayWeather}</div>
                                <div>
                                    {todayWeather.nightTemp}℃ ~ {todayWeather.dayTemp}℃
                                </div>
                                <div>
                                    {todayWeather.dayWindDir} {todayWeather.dayWindPower}
                                </div>
                                <div>{city}</div>
                            </div>
                        </section>
                    )}

                    <footer className="pasture-weather__more">footer</footer>
                </main>
            </Card>
        </div>
    )
}

export default OverviewWeather
