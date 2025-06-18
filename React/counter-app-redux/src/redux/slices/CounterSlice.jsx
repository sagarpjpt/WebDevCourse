// slice means portion of data --- here counter se related data / function all here 


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
}

const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    // reducers contains all function definition
    reducers: {
        increment :(state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
})

// to fetch function of our app we use CounterSlice.actions
export const {increment, decrement} = CounterSlice.actions;
export default CounterSlice.reducer;