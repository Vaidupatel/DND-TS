import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';
import { ensureDBInitialized, saveState, loadState } from '../store/indexedDB';

const store = configureStore({
  reducer: rootReducer,
});
ensureDBInitialized()
  .then(() => {
    return loadState();
  })
  .then((savedState) => {
    if (savedState) {
      store.dispatch({ type: 'SET_SAVED_STATE', payload: savedState });
    }
  })
  .catch((error) => {
    console.error('Failed to initialize database or load state:', error);
  });

store.subscribe(() => {
  saveState(store.getState()).catch((error) => {
    console.error('Failed to save state:', error);
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;