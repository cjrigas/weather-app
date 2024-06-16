import { CurrentWeatherResponse } from '@/services/weatherapi/types'

export interface WeatherData {
  location: string
  condition: string
  icon: string
  values: {
    Temperature: string
    Wind_Speed: string
    Wind_Direction: string
    Humidity: string
    Precipitation: string
    UV_Index: string
  }
}

export interface CurrentWeatherViewProps extends React.ComponentProps<"div"> {
  data: WeatherData
  isFavourite: boolean
  onFavouriteClicked: () => void
}

export interface CurrentWeatherProps extends Omit<CurrentWeatherViewProps, 'data'> {
  data: CurrentWeatherResponse
}
