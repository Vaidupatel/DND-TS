import { configureStore } from '@reduxjs/toolkit';
import componentNamesReducer from './slices/componentNamesSlice';
import divChildReducer from './slices/divChildListSlice'
import spanChildReducer from './slices/spanChildSlice';
import sectionReducer from "./slices/sectionChildSlice"
import headerChildReducer from './slices/headerChildSlice';
import footerChilReducer from './slices/footerChildSlice'
import mainChildReducer from './slices/mainChildSlice';
import articleReducer from './slices/articleChildSlice';
import asideReducer from './slices/asideChildSlice';
import navReducer from './slices/navChildSlice';
import ulReducer from './slices/ulChildSlice';
import olReducer from './slices/olChildSlice';
import dlReducer from './slices/dlChildSlice';
import fieldSetReducer from './slices/fieldsetChildSlice';
import formReducer from './slices/formChildSlice';
import tableReducer from './slices/tableChildSlice';
import iFrameReducer from './slices/iFrameChildSlice';
import figureReducer from './slices/figureChildSlice';
import liReducer from './slices/liChildSlice';
import dtReducer from './slices/dtChildSlice';
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
        articleChild: articleReducer,
        asideChild: asideReducer,
        navChild: navReducer,
        ulChild: ulReducer,
        olChild: olReducer,
        dlChild: dlReducer,
        fieldSetChild: fieldSetReducer,
        formChild: formReducer,
        tableChild: tableReducer,
        iFrameChild: iFrameReducer,
        figureChild: figureReducer,
        liChild: liReducer,
        dtChild: dtReducer,
    },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
