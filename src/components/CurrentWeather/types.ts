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

export interface CurrentWeatherProps extends React.ComponentProps<"div"> {
  data: WeatherData
  isFavourite: boolean
  onFavouriteClicked: () => void
}
