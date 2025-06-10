// what is store ----> global/centralize entity/state of our app where state stored in form of slices

// agr redux ka store banana hai to use configureStore function ye function ek 
// global store create karta hai jaha aap ka saara centralize data hota hai jaha state aapki 
// centralize padi hogi 
// just like contextapi mein ek global state banate hai jaha se hr koi access/chnage kr 
// pata hai waise hi yaha pe centralize store hota hai

import { configureStore } from "@reduxjs/toolkit";
// import { CounterSlice } from "./slices/CounterSlice"; // try to import CounterSlice without {} brackets
import counterReducer from "./slices/CounterSlice"; // Import the default export


export const store = configureStore({
    reducer: {
        // counter: CounterSlice
        counter: counterReducer  // Correct: reducer is the exported reducer
    },
})

// now store is ready  where all data are in form of slices and also have made a particular slice
// how to connect react and redux code ? 
// ans -- using provider just like we used provider in context api --- ie wrap our app <App /> with provider