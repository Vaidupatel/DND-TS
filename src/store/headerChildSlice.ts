
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderChildState {
    [headerId: string]: string[];
}

const initialState: HeaderChildState = {};

const headerChildSlice = createSlice({
    name: 'headerChild',
    initialState,
    reducers: {
        addHeaderChild: (state, action: PayloadAction<{ HeaderId: string, componentName: string }>) => {
            const { HeaderId, componentName } = action.payload;
            if (!state[HeaderId]) {
                state[HeaderId] = [];
            }
            state[HeaderId].push(componentName);
        },
        removeHeaderChild: (state, action: PayloadAction<{ HeaderId: string, componentIndex: number }>) => {
            const { HeaderId, componentIndex } = action.payload;
            if (state[HeaderId]) {
                state[HeaderId].splice(componentIndex, 1);
            }
        },
        clearHeaderChildren: (state, action: PayloadAction<{ HeaderId: string }>) => {
            const { HeaderId } = action.payload;
            if (state[HeaderId]) {
                state[HeaderId] = [];
            }
        },
    },
});

export const { addHeaderChild, removeHeaderChild, clearHeaderChildren } = headerChildSlice.actions;

export default headerChildSlice.reducer;
