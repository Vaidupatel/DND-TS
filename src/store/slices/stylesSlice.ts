import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StylesState {
  [componentId: string]: Record<string, string>;
}

const initialState: StylesState = {};

const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    setComponentStyles: (state, action: PayloadAction<{ componentId: string; styles: Record<string, string> }>) => {
      const { componentId, styles } = action.payload;
      state[componentId] = styles;
    },
    updateComponentStyle: (state, action: PayloadAction<{ componentId: string; property: string; value: string }>) => {
      const { componentId, property, value } = action.payload;
      if (!state[componentId]) {
        state[componentId] = {};
      }
      state[componentId][property] = value;
    },
    removeComponentStyles: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    setAllStyles: (state, action: PayloadAction<StylesState>) => {
      return action.payload;
    },
  },
});

export const { setComponentStyles, updateComponentStyle, removeComponentStyles, setAllStyles } = stylesSlice.actions;
export default stylesSlice.reducer;




// // stylesSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Define the state type
// export interface StylesState {
//   [componentId: string]: Record<string, string>;
// }

// // Initial state
// const initialState: StylesState = {};

// // Create the slice
// const stylesSlice = createSlice({
//   name: 'styles',
//   initialState,
//   reducers: {
//     setComponentStyles: (state, action: PayloadAction<{ componentId: string; styles: Record<string, string> }>) => {
//       const { componentId, styles } = action.payload;
//       state[componentId] = styles;
//     },
//     updateComponentStyle: (state, action: PayloadAction<{ componentId: string; property: string; value: string }>) => {
//       const { componentId, property, value } = action.payload;
//       if (!state[componentId]) {
//         state[componentId] = {};
//       }
//       state[componentId][property] = value;
//     },
//     removeComponentStyles: (state, action: PayloadAction<string>) => {
//       delete state[action.payload];
//     },
//     setAllStyles: (state, action: PayloadAction<StylesState>) => {
//       return action.payload;
//     },
//   },
// });

// // Export the actions
// export const { setComponentStyles, updateComponentStyle, removeComponentStyles, setAllStyles } = stylesSlice.actions;

// // Export the reducer as default export
// export default stylesSlice.reducer;
