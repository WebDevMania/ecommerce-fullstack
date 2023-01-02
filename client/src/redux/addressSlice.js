import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: {},
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    submitAddress(state, action) {
       state.address = action.payload
    },
    emptyAddress(state){
        state.address = {}
    }
  },
})

export const { submitAddress } = addressSlice.actions

export default addressSlice.reducer