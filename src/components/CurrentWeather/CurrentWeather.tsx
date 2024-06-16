import { twMerge } from 'tailwind-merge'

import { CurrentWeatherProps } from './types'

const CurrentWeather = ({ className, data, isFavourite, onFavouriteClicked, ...props }: CurrentWeatherProps) => {
  return (
    <div className={twMerge('relative mt-40 bg-black bg-opacity-40 p-20 rounded-lg', className)} {...props}>
      <button title='add to favourites' className='absolute flex flex-row top-5 right-5 active:opacity-55' onClick={onFavouriteClicked}>
        <div className='w-8 h-8'>
          <svg width="100%" height="100%" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={isFavourite ? '#fc5353' : "#959595"} id="Vector" d="M12.8209 22L11.0748 20.4414C9.04772 18.6231 7.37186 17.0545 6.04723 15.7357C4.7226 14.4169 3.66891 13.2328 2.88618 12.1833C2.10344 11.1347 1.55673 10.1708 1.24604 9.29155C0.935356 8.41235 0.779611 7.51317 0.778809 6.594C0.778809 4.71571 1.41102 3.14714 2.67544 1.88828C3.93986 0.629428 5.51537 0 7.40197 0C8.44562 0 9.43909 0.2198 10.3824 0.6594C11.3257 1.099 12.1385 1.71844 12.8209 2.51771C13.5033 1.71844 14.3161 1.099 15.2594 0.6594C16.2027 0.2198 17.1962 0 18.2399 0C20.1265 0 21.702 0.629428 22.9664 1.88828C24.2308 3.14714 24.863 4.71571 24.863 6.594C24.863 7.51317 24.7073 8.41235 24.3958 9.29155C24.0843 10.1708 23.5376 11.1347 22.7557 12.1833C21.9729 13.2328 20.9192 14.4169 19.5946 15.7357C18.27 17.0545 16.5941 18.6231 14.567 20.4414L12.8209 22Z"/>
          </svg>
        </div>
      </button>
      <div className='text-center'>
        <span className='text-sm text-gray-300 font-extralight'>showing current weather for</span>
        <br />
        <span className='text-2xl text-yellow-200 font-extralight'>{ data.location }</span></div>
      <div className='flex flex-row items-center justify-center'>
        <span className='font-light text-white'>{ data.condition }</span>
        <img className='w-15' src={data.icon } />
      </div>
      <div className='flex flex-row flex-wrap justify-center mt-8'>
        { Object.entries(data.values).map(([key, value]) => (
          <div key={key} className='relative flex flex-col items-center justify-center m-3 bg-[#606060] border rounded-md border-red-50 opacity-80' style={{ height: 160, width: 200 }}>
            <div className='absolute text-yellow-200 top-3'>{ key }</div>
            <div className='text-3xl text-white'>{ value }</div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default CurrentWeather
