import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DivChildState {
    [DivId: string]: string[];
}

const initialState: DivChildState = {};

const divChildSlice = createSlice({
    name: 'divChild',
    initialState,
    reducers: {
        addDivChild: (state, action: PayloadAction<{ DivId: string, componentName: string }>) => {
            const { DivId, componentName } = action.payload;
            if (!state[DivId]) {
                state[DivId] = [];
            }
            state[DivId].push(componentName);
        },
        removeDivChild: (state, action: PayloadAction<{ DivId: string, componentIndex: number }>) => {
            const { DivId, componentIndex } = action.payload;
            if (state[DivId]) {
                delete state[DivId][componentIndex];
            }
        },
        clearDivChildren: (state, action: PayloadAction<{ DivId: string }>) => {
            const { DivId } = action.payload;
            if (state[DivId]) {
                state[DivId] = [];
            }
        },
        setInitialDivChild: () => {
            return initialState
        }
    },
});

export const { addDivChild, removeDivChild, clearDivChildren, setInitialDivChild } = divChildSlice.actions;

export default divChildSlice.reducer;
