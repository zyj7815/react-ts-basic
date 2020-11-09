const AMap = window.AMap

/**
 * 获取高德天气
 */
export const getAMapWeather = () => {
    return new Promise(resolved => {
        new Promise((resolve, reject) => {
            // AMap通过jsonp获取
            AMap.plugin('AMap.CitySearch', function() {
                const citySearch = new AMap.CitySearch()
                citySearch.getLocalCity((s, r) => {
                    const { city } = r

                    resolve(city)
                })
            })
        }).then(city => {
            AMap.service('AMap.Weather', function() {
                const weather = new AMap.Weather()
                weather.getForecast(city, function(err, data) {
                    resolved(data)
                })
            })
        })
    })
}
