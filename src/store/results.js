import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState =  {
  loading: false,
  completeMatches: [],
  partialMatches: []
}

// Use thunk to fetch from API
export const searchTrips = createAsyncThunk(
  'searchTrips',
  async params => {
    const response = await fetch('http://localhost:3001/trips?' + new URLSearchParams(params))
    return await response.json()
  }
)

const resultsSlice = createSlice({
  name: 'counter',
  initialState,
  extraReducers: {
    // Add loading
    [searchTrips.pending]: (state, action) => {
      state.loading = true
    },
    // Save results from thunk
    [searchTrips.fulfilled]: (state, action) => {
      state.completeMatches = action.payload.completeMatches
      state.partialMatches = action.payload.partialMatches
      state.loading = false
    }
  }
})

export const { enableLoading, disableLoading } = resultsSlice.actions
export default resultsSlice.reducer