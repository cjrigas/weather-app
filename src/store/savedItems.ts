import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'

export interface SavedItemsInitialState<T> {
  recent: T[]
  favourites: T[]
}

const initialState: SavedItemsInitialState<any> = {
  recent: [],
  favourites: [],
}

const savedItemsSlice = createSlice({
  name: 'savedItems',
  initialState,
  reducers: {
    addToRecent: (state, action: PayloadAction<any>) => {
      state.recent = [...state.recent, action.payload]
    },
    addToFavourites: (state, action: PayloadAction<any>) => {
      const itemExists = state.favourites.some(item => item.id === action.payload.id)
      if (!itemExists) {
        state.favourites = [...state.favourites, action.payload]
      }
    },
    clearAllRecent: (state) => {
      state.recent = []
    },
  },
})

const selectFavourites = (state: any) => state.savedItems.favourites

export const selectIsFavourite = createSelector(
  [selectFavourites, (_, item) => item?.id],
  (items, itemId) =>  Boolean(itemId && items.find((item: any) => item.id === itemId))
)

export const { addToRecent, addToFavourites, clearAllRecent } = savedItemsSlice.actions
export default savedItemsSlice.reducer
