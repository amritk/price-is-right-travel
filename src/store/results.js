import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState =  {
  loading: false,
  completeMatches: [],
  partialMatches: [],
  searched: false
}

// Use thunk to fetch from API
export const searchTrips = createAsyncThunk(
  'searchTrips',
  async params => {
    try {
      const response = await fetch('http://localhost:3001/trips?' + new URLSearchParams(params))
      return await response.json()
    }
    catch (e) {
      console.error(e)
      alert('There may have been a server error, make sure its on with "yarn startServer" and if so, check the logs!')
    }
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
      state.searched = true
    }
  }
})

export const { enableLoading, disableLoading } = resultsSlice.actions
export default resultsSlice.reducer