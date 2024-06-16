import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
      state.recent = [...state.favourites, action.payload]
    },
    clearAllRecent: (state) => {
      state.recent = []
    },
  },
});

export const { addToRecent, addToFavourites, clearAllRecent } = savedItemsSlice.actions
export default savedItemsSlice.reducer
