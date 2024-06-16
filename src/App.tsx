import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchInput from '@components/SearchInput/SearchInput'
import SearchResultsList from '@/components/SearchResultsList/SearchResultsList'
import RecentsList from '@/components/RecentsList/RecentsList'
import CurrentWeather from '@/components/CurrentWeather/CurrentWeather'
import FavouritesList from '@/components/FavouritesList/FavouritesList'
import { useLazyCurrentQuery, useSearchQuery } from '@/services/weatherapi'
import { SearchResponse } from '@/services/weatherapi/types'
import useDebounce from '@/hooks/useDebounce'
import { addToRecent, clearAllRecent, addToFavourites, selectIsFavourite } from '@/store/savedItems'
import { RootState } from '@/store'

type ListItem = SearchResponse['0'] & { key: string, text: string }

const App = () => {
  const dispatch = useDispatch()

  const recentItems = useSelector((state: RootState) => state.savedItems.recent)
  const favouriteItems = useSelector((state: RootState) => state.savedItems.favourites)

  const [currentLocation, seCurrentLocation] = useState<ListItem>()
  const isFavourite = useSelector((state) => selectIsFavourite(state, currentLocation))

  const [isFocused, setIsFocused] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data: searchResults } = useSearchQuery(debouncedSearchQuery, { skip: debouncedSearchQuery.length < 3 })
  const [trigger, { data: currentWeather }] = useLazyCurrentQuery()

  const listItems = useMemo(() => searchResults?.map(item => ({ key: `${item.id}`, text: `${item.name}, ${item.region} | ${item.country}`, ...item })), [searchResults])

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

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setTimeout(() => setIsFocused(false), 100)
  }, [])

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

  const onClearClicked = () => {
    dispatch(clearAllRecent())
  }

  const onFavouriteClicked = () => {
    dispatch(addToFavourites(currentLocation))
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="mt-0 mb-2 text-6xl font-normal leading-normal text-[#4a4942]">Weather App</h1>
      <div className="mb-2 text-base text-white">Enter a city to see weather details</div>
      <div className="container">
        <div className="grid grid-cols-6 gap-4">
          <div className="relative col-span-2 col-start-3 shadow-2xl shadow-black">
            <SearchInput className="w-full" placeholder="eg Athens" value={searchQuery} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            { (isFocused && searchQuery == '' && recentItems.length > 0) && <RecentsList<ListItem> className="absolute bg-slate-100" items={recentItems} onItemClick={onItemClick} onClearClicked={onClearClicked} /> }
            { (isFocused && searchQuery.length > 2 && listItems) && <SearchResultsList<ListItem> className="absolute bg-slate-100" items={listItems} onItemClick={onSearchItemClick} /> }
          </div>
        </div>
        { favouriteItems.length > 0 && <FavouritesList<ListItem> items={favouriteItems} onItemClick={onItemClick} /> }
        { currentWeatherData && <CurrentWeather data={currentWeatherData} onFavouriteClicked={onFavouriteClicked} isFavourite={isFavourite} /> }
      </div>
    </div>
  )
}

export default App
