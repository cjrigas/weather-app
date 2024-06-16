import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CurrentWeather from '@/components/CurrentWeather/CurrentWeather'
import FavouritesList from '@/components/FavouritesList/FavouritesList'
import { useLazyCurrentQuery } from '@/services/weatherapi'
import { SearchResponse } from '@/services/weatherapi/types'
import { addToRecent, addToFavourites, selectIsFavourite } from '@/store/savedItems'
import { RootState } from '@/store'
import SearchSection from './components/SearchSection/SearchSection'

type ListItem = SearchResponse['0'] & { key: string, text: string }

const App = () => {
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentLocation, seCurrentLocation] = useState<ListItem>()

  const favouriteItems = useSelector((state: RootState) => state.savedItems.favourites)
  const isFavourite = useSelector((state) => selectIsFavourite(state, currentLocation))

  const [trigger, { data: currentWeather }] = useLazyCurrentQuery()

  const currentWeatherData = useMemo(() => {
    if (!currentWeather) return
    const { location, current } = currentWeather
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
  }, [currentWeather])

  const onSearchItemClick = useCallback((item: ListItem) => {
    setSearchQuery('')
    dispatch(addToRecent({ ...item, key: `${Date.now()}` }))
    trigger({ city: `id:${item.id}`, aqi: 'no' })
      .then(_ => seCurrentLocation(item))
  }, [])

  const onItemClick = useCallback((item: ListItem) => {
    setSearchQuery('')
    trigger({ city: `id:${item.id}`, aqi: 'no' })
      .then(_ => seCurrentLocation(item))
  }, [])

  const onFavouriteClicked = () => {
    dispatch(addToFavourites(currentLocation))
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="mt-0 mb-2 text-6xl font-normal leading-normal text-[#fff4a8]">Weather App</h1>
      <div className="mb-2 text-base text-white">Enter a city to see weather details</div>
      <div className="container flex flex-col items-center justify-center">
        <div className="w-[500px]">
          <SearchSection
            className='w-full'
            inputValue={searchQuery}
            onValueChange={setSearchQuery}
            onSearchItemClick={onSearchItemClick}
            onRecentItemClick={onItemClick}
          />
          { favouriteItems.length > 0 && <FavouritesList<ListItem> items={favouriteItems} onItemClick={onItemClick} /> }
        </div>
        { currentWeatherData && <CurrentWeather data={currentWeatherData} onFavouriteClicked={onFavouriteClicked} isFavourite={isFavourite} /> }
      </div>
    </div>
  )
}

export default App
