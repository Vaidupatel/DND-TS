import { configureStore } from '@reduxjs/toolkit';
// import counterReducer, { CounterState } from './counterSlice';
import componentNamesReducer from './componentNamesSlice';


const store = configureStore({
    reducer: {
        // counter: counterReducer,
        componentNames: componentNamesReducer
    },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
