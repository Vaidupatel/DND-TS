
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DtChildState {
    [DtId: string]: string[];
}

const initialState: DtChildState = {};

const dtChildSlice = createSlice({
    name: 'dtChild',
    initialState,
    reducers: {
        addDtChild: (state, action: PayloadAction<{ DtId: string, componentName: string }>) => {
            const { DtId, componentName } = action.payload;
            if (!state[DtId]) {
                state[DtId] = [];
            }
            state[DtId].push(componentName);
        },
        removeDtChild: (state, action: PayloadAction<{ DtId: string, componentIndex: number }>) => {
            const { DtId, componentIndex } = action.payload;
            if (state[DtId]) {
                delete state[DtId][componentIndex];
            }
        },
        clearDtChildren: (state, action: PayloadAction<{ DtId: string }>) => {
            const { DtId } = action.payload;
            if (state[DtId]) {
                state[DtId] = [];
            }
        },
        setInitialDtChild: () => {
            return initialState;
        }
    },
});

export const { addDtChild, removeDtChild, clearDtChildren, setInitialDtChild } = dtChildSlice.actions;

export default dtChildSlice.reducer;
