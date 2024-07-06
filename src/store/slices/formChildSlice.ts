
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormChildState {
    [FormId: string]: string[];
}

const initialState: FormChildState = {};

const formChildSlice = createSlice({
    name: 'formChild',
    initialState,
    reducers: {
        addFormChild: (state, action: PayloadAction<{ FormId: string, componentName: string }>) => {
            const { FormId, componentName } = action.payload;
            if (!state[FormId]) {
                state[FormId] = [];
            }
            state[FormId].push(componentName);
        },
        removeFormChild: (state, action: PayloadAction<{ FormId: string, componentIndex: number }>) => {
            const { FormId, componentIndex } = action.payload;
            if (state[FormId]) {
                delete state[FormId][componentIndex];
            }
        },
        clearFormChildren: (state, action: PayloadAction<{ FormId: string }>) => {
            const { FormId } = action.payload;
            if (state[FormId]) {
                state[FormId] = [];
            }
        },
        setInitialFormChild: () => {
            return initialState
        }
    },
});

export const { addFormChild, removeFormChild, clearFormChildren, setInitialFormChild } = formChildSlice.actions;

export default formChildSlice.reducer;
