
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
                delete state[HeaderId][componentIndex];
            }
        },
        clearHeaderChildren: (state, action: PayloadAction<{ HeaderId: string }>) => {
            const { HeaderId } = action.payload;
            if (state[HeaderId]) {
                state[HeaderId] = [];
            }
        },
        setInitialHeaderChild: () => {
            return initialState
        }
    },
});

export const { addHeaderChild, removeHeaderChild, clearHeaderChildren, setInitialHeaderChild } = headerChildSlice.actions;

export default headerChildSlice.reducer;
