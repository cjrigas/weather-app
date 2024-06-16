import { useMemo } from 'react'

import CurrentWeatherView from './CurrentWeatherView'
import { CurrentWeatherProps, CurrentWeatherViewProps } from './types'

const CurrentWeather = (props: CurrentWeatherProps) => {
  const data = useMemo(() => {
    if (!props.data) return
    const { location, current } = props.data
    return {
      location: `${location.name}${location.region ? `, ${location.region}` : ''} | ${location.country}`,
      condition: current.condition.text,
      icon: current.condition.icon,
      values: {
        Temperature: `${current.temp_c} °C`,
        Wind_Speed: `${current.wind_kph} km/h`,
        Wind_Direction: current.wind_dir,
        Humidity: `${current.humidity} %`,
        Precipitation: `${current.precip_mm} mm`,
        UV_Index: `${current.uv}`,
      },
    }
  }, [props.data])

  return <CurrentWeatherView {...{...props, data } as CurrentWeatherViewProps} />
}

export default CurrentWeather
