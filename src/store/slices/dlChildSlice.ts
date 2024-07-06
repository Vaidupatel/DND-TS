
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DlChildState {
    [DlId: string]: string[];
}

const initialState: DlChildState = {};

const dlChildSlice = createSlice({
    name: 'dlChild',
    initialState,
    reducers: {
        addDlChild: (state, action: PayloadAction<{ DlId: string, componentName: string }>) => {
            const { DlId, componentName } = action.payload;
            if (!state[DlId]) {
                state[DlId] = [];
            }
            state[DlId].push(componentName);
        },
        removeDlChild: (state, action: PayloadAction<{ DlId: string, componentIndex: number }>) => {
            const { DlId, componentIndex } = action.payload;
            if (state[DlId]) {
                delete state[DlId][componentIndex];
            }
        },
        clearDlChildren: (state, action: PayloadAction<{ DlId: string }>) => {
            const { DlId } = action.payload;
            if (state[DlId]) {
                state[DlId] = [];
            }
        },
        setInitialDlChild: () => {
            return initialState
        }
    },
});

export const { addDlChild, removeDlChild, clearDlChildren, setInitialDlChild } = dlChildSlice.actions;

export default dlChildSlice.reducer;
