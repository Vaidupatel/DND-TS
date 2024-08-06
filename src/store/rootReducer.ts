import { combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';
import componentNamesReducer from './slices/componentNamesSlice';
import divChildReducer from './slices/divChildListSlice';
import spanChildReducer from './slices/spanChildSlice';
import sectionReducer from "./slices/sectionChildSlice";
import headerChildReducer from './slices/headerChildSlice';
import footerChildReducer from './slices/footerChildSlice';
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
import selectReducer from './slices/selectChildSlice';
import paragraphReducer from './slices/paragraphChildSlice';
import stylesReducer from './slices/stylesSlice';

const appReducer = combineReducers({
    componentNames: componentNamesReducer,
    divChild: divChildReducer,
    spanChild: spanChildReducer,
    sectionChild: sectionReducer,
    headerChild: headerChildReducer,
    footerChild: footerChildReducer,
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
    selectChild: selectReducer,
    paragraphChild: paragraphReducer,
    styles: stylesReducer,
});
export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState | undefined, action: AnyAction): RootState => {
    if (action.type === 'SET_SAVED_STATE') {
        return action.payload as RootState;
    }
    return appReducer(state, action);
};

export default rootReducer;
