
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FieldSetChildState {
    [FieldSetId: string]: string[];
}

const initialState: FieldSetChildState = {};

const fieldSetChildSlice = createSlice({
    name: 'fieldSetChild',
    initialState,
    reducers: {
        addFieldSetChild: (state, action: PayloadAction<{ FieldSetId: string, componentName: string }>) => {
            const { FieldSetId, componentName } = action.payload;
            if (!state[FieldSetId]) {
                state[FieldSetId] = [];
            }
            state[FieldSetId].push(componentName);
        },
        removeFieldSetChild: (state, action: PayloadAction<{ FieldSetId: string, componentIndex: number }>) => {
            const { FieldSetId, componentIndex } = action.payload;
            if (state[FieldSetId]) {
                delete state[FieldSetId][componentIndex];
            }
        },
        clearFieldSetChildren: (state, action: PayloadAction<{ FieldSetId: string }>) => {
            const { FieldSetId } = action.payload;
            if (state[FieldSetId]) {
                state[FieldSetId] = [];
            }
        },
        setInitialFieldSetChild: () => {
            return initialState
        }
    },
});

export const { addFieldSetChild, removeFieldSetChild, clearFieldSetChildren, setInitialFieldSetChild } = fieldSetChildSlice.actions;

export default fieldSetChildSlice.reducer;
