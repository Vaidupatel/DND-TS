// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface divChildState {
//     names: { [key: number]: string };
// }

// const initialState: divChildState = {
//     names: {},
// };

// const divChildSlice = createSlice({
//     name: 'divChild',
//     initialState,
//     reducers: {
//         adddivChild: (state, action: PayloadAction<string>) => {
//             // const { index, name } = action.payload;
//             // state.names[index] = name;
//             const newIndex = Object.keys(state.names).length + 1; // Generate a new index
//             state.names[newIndex] = action.payload;
//         },
//         removedivChild: (state, action: PayloadAction<number>) => {
//             const indexToRemove = action.payload;
//             delete state.names[indexToRemove];
//         },
//         cleardivChild: (state) => {
//             state.names = [];
//         },
//     },
// });

// export const { adddivChild, removedivChild, cleardivChild } = divChildSlice.actions;

// export default divChildSlice.reducer;



















// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface DivChildState {
//     names: { [key: number]: string };
// }

// const initialState: DivChildState = {
//     names: {},
// };

// const divChildSlice = createSlice({
//     name: 'divChild',
//     initialState,
//     reducers: {
//         addDivChild: (state, action: PayloadAction<{ componentName: string }>) => {
//             const { componentName } = action.payload;
//             const newIndex = Object.keys(state.names).length + 1;
//             state.names[newIndex] = componentName;
//         },
//         removeDivChild: (state, action: PayloadAction<{ componentIndex: number }>) => {
//             const { componentIndex } = action.payload;
//             if (state.names[componentIndex]) {
//                 delete state.names[componentIndex];
//             }
//         },
//         clearDivChildren: (state) => {
//             state.names = {};
//         },

//     },
// });

// export const { addDivChild, removeDivChild, clearDivChildren } = divChildSlice.actions;

// export default divChildSlice.reducer;










import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DivChildState {
    [divId: string]: string[];
}

const initialState: DivChildState = {};

const divChildSlice = createSlice({
    name: 'divChild',
    initialState,
    reducers: {
        addDivChild: (state, action: PayloadAction<{ divId: string, componentName: string }>) => {
            const { divId, componentName } = action.payload;
            if (!state[divId]) {
                state[divId] = [];
            }
            state[divId].push(componentName);
        },
        removeDivChild: (state, action: PayloadAction<{ divId: string, componentIndex: number }>) => {
            const { divId, componentIndex } = action.payload;
            if (state[divId]) {
                state[divId].splice(componentIndex, 1);
            }
        },
        clearDivChildren: (state, action: PayloadAction<{ divId: string }>) => {
            const { divId } = action.payload;
            if (state[divId]) {
                state[divId] = [];
            }
        },
    },
});

export const { addDivChild, removeDivChild, clearDivChildren } = divChildSlice.actions;

export default divChildSlice.reducer;
