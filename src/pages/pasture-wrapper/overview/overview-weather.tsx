import React from 'react'
import { Card, Row, Col } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { getAMapWeather } from '@/service/weather'
import { getWeatherIcon } from '@/assets/images/weather'
import { Helper } from '@/helper'

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
            setTodayWeather(data.forecasts[0])
            setCity(`${data.province}${data.city}`)
            setWeatherList([
                {
                    date: useLanguage.tomorrow,
                    temperature: `${data.forecasts[1].nightTemp}~${data.forecasts[1].dayTemp}`,
                },
                {
                    date: useLanguage.the_day_after_tomorrow,
                    temperature: `${data.forecasts[2].nightTemp}~${data.forecasts[2].dayTemp}`,
                },
                {
                    date: Helper.utc2Time(data.forecasts[3].date, 'MM月DD日'),
                    temperature: `${data.forecasts[3].nightTemp}~${data.forecasts[3].dayTemp}`,
                },
            ])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className="pasture-overview-item beauty-shadow"
            style={{ height: '33%', minHeight: 240 }}
        >
            <header className="pasture-overview-item__header">{useLanguage.weather}</header>
            <section className="pasture-overview-item__content">
                <main className="pasture-overview-weather">
                    {todayWeather && (
                        <Row className="pasture-weather__content">
                            <Col className="today-weather-icon" xs={8} sm={8} md={7} lg={9} xl={8}>
                                <img src={getWeatherIcon(todayWeather.dayWeather)} alt="" />
                            </Col>

                            <Col className="today-weather-content">
                                <div>
                                    <strong>{todayWeather.dayWeather}</strong>
                                </div>

                                <strong className="today-weather-content__temperature">
                                    {todayWeather.nightTemp}℃ ~ {todayWeather.dayTemp}℃
                                </strong>
                                <div className="today-weather-content__wind">
                                    {todayWeather.dayWindDir}风 {todayWeather.dayWindPower}
                                </div>
                                <div className="today-weather-content__city">{city}</div>
                            </Col>
                        </Row>
                    )}
                    <footer className="pasture-weather__more">
                        {weatherList.map((weather: any, index: number) => (
                            <main key={index} className="pasture-weather__more-item">
                                <header>{weather.date}</header>
                                <article>{weather.temperature}℃</article>
                            </main>
                        ))}
                    </footer>
                </main>
            </section>
        </div>
    )
}

export default OverviewWeather
