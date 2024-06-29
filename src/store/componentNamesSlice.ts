import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ComponentNamesState {
  names: string[];
}

const initialState: ComponentNamesState = {
  names: [],
};

const componentNamesSlice = createSlice({
  name: 'componentNames',
  initialState,
  reducers: {
    addComponentName: (state, action: PayloadAction<string>) => {
      state.names.push(action.payload);
    },
    removeComponentName: (state, action: PayloadAction<number>) => {
      state.names.splice(action.payload, 1);
    },
    clearComponentNames: (state) => {
      state.names = [];
    },
  },
});

export const { addComponentName, removeComponentName, clearComponentNames } = componentNamesSlice.actions;

export default componentNamesSlice.reducer;
