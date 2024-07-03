import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ComponentNamesState {
  names: { [key: number]: string };
}

const initialState: ComponentNamesState = {
  names: {},
};

const componentNamesSlice = createSlice({
  name: 'componentNames',
  initialState,
  reducers: {
    addComponentName: (state, action: PayloadAction<string>) => {
      // const { index, name } = action.payload;
      // state.names[index] = name;
      const newIndex = Object.keys(state.names).length + 1; // Generate a new index
      state.names[newIndex] = action.payload;
    },
    removeComponentName: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      delete state.names[indexToRemove];
    },
    clearComponentNames: (state) => {
      state.names = [];
    },
  },
});

export const { addComponentName, removeComponentName, clearComponentNames } = componentNamesSlice.actions;

export default componentNamesSlice.reducer;
