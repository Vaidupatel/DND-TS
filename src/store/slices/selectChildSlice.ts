
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectChildState {
    [SelectId: string]: string[];
}

const initialState: SelectChildState = {};

const selectChildSlice = createSlice({
    name: 'selectChild',
    initialState,
    reducers: {
        addSelectChild: (state, action: PayloadAction<{ SelectId: string, componentName: string }>) => {
            const { SelectId, componentName } = action.payload;
            if (!state[SelectId]) {
                state[SelectId] = [];
            }
            state[SelectId].push(componentName);
        },
        removeSelectChild: (state, action: PayloadAction<{ SelectId: string, componentIndex: number }>) => {
            const { SelectId, componentIndex } = action.payload;
            if (state[SelectId]) {
                delete state[SelectId][componentIndex];
            }
        },
        clearSelectChildren: (state, action: PayloadAction<{ SelectId: string }>) => {
            const { SelectId } = action.payload;
            if (state[SelectId]) {
                state[SelectId] = [];
            }
        },
        setInitialSelectChild: () => {
            return initialState
        }
    },
});

export const { addSelectChild, removeSelectChild, clearSelectChildren, setInitialSelectChild } = selectChildSlice.actions;

export default selectChildSlice.reducer;
