import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchSection from '@/components/SearchSection/SearchSection'
import CurrentWeather from '@/components/CurrentWeather/CurrentWeather'
import FavouritesList from '@/components/FavouritesList/FavouritesList'
import { useLazyCurrentQuery } from '@/services/weatherapi'
import { SearchResponse } from '@/services/weatherapi/types'
import { addToRecent, addToFavourites, selectIsFavourite } from '@/store/savedItems'
import { RootState } from '@/store'

type ListItem = SearchResponse['0'] & { key: string, text: string }

const App = () => {
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchError, setSearchError] = useState<any>(null)
  const [currentLocation, seCurrentLocation] = useState<ListItem>()

  const favouriteItems = useSelector((state: RootState) => state.savedItems.favourites)
  const isFavourite = useSelector((state) => selectIsFavourite(state, currentLocation))

  const [trigger, { data: currentWeather, error: currentWeatherError }] = useLazyCurrentQuery()

  const handleSearchError = useCallback((error: any) => {
    setSearchError(error)
  }, [])

  const errorMessage = (searchError || currentWeatherError)?.data?.error?.message

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

  const onFavouriteClicked = useCallback(() => {
    dispatch(addToFavourites(currentLocation))
  }, [currentLocation])

  return (
    <div>
      <div className='container flex flex-col items-center justify-center mx-auto mt-16'>
        <h1 className="mt-0 mb-2 text-6xl font-normal leading-normal text-[#fff4a8]">Weather App</h1>
        <div className="mb-2 text-base text-white">Enter a city to see weather details</div>
        <div className="w-[500px]">
          <SearchSection
            className='w-full'
            inputValue={searchQuery}
            onValueChange={setSearchQuery}
            onSearchItemClick={onSearchItemClick}
            onRecentItemClick={onItemClick}
            onError={handleSearchError}
          />
          { errorMessage && <div className='absolute mt-2 text-red-600'>{ errorMessage }</div> }
          <div className='absolute left-0 w-full mt-5'>
            { favouriteItems.length > 0 && <FavouritesList<ListItem> items={favouriteItems} onItemClick={onItemClick} /> }
          </div>
        </div>
        { (!currentWeatherError && currentWeather) && <CurrentWeather className='mt-32 mb-24' data={currentWeather} onFavouriteClicked={onFavouriteClicked} isFavourite={isFavourite} /> }
      </div>
    </div>
  )
}

export default App
