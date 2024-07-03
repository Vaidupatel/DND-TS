import { configureStore } from '@reduxjs/toolkit';
// import counterReducer, { CounterState } from './counterSlice';
import componentNamesReducer from './componentNamesSlice';
import divChildReducer from './divChildListSlice'
import spanChildReducer from './spanChildSlice';
import sectionReducer from "./sectionChildSlice"
import headerChildReducer from './headerChildSlice';
import footerChilReducer from './footerChildSlice'
import mainChildReducer from './mainChildSlice';
import articaleReducer from './articaleChildSlice';
import asideReducer from './asideChildSlice'
import navReducer from './navChildSlice'

const store = configureStore({
    reducer: {
        // counter: counterReducer,
        componentNames: componentNamesReducer,
        divChild: divChildReducer,
        spanChild: spanChildReducer,
        sectionChild: sectionReducer,
        headerChild: headerChildReducer,
        footerChild: footerChilReducer,
        mainChild: mainChildReducer,
        articaleChild: articaleReducer,
        asideChild: asideReducer,
        navChild: navReducer,
    },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
