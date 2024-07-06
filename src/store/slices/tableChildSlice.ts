
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableChildState {
    [TableId: string]: string[];
}

const initialState: TableChildState = {};

const tableChildSlice = createSlice({
    name: 'tableChild',
    initialState,
    reducers: {
        addTableChild: (state, action: PayloadAction<{ TableId: string, componentName: string }>) => {
            const { TableId, componentName } = action.payload;
            if (!state[TableId]) {
                state[TableId] = [];
            }
            state[TableId].push(componentName);
        },
        removeTableChild: (state, action: PayloadAction<{ TableId: string, componentIndex: number }>) => {
            const { TableId, componentIndex } = action.payload;
            if (state[TableId]) {
                delete state[TableId][componentIndex];
            }
        },
        clearTableChildren: (state, action: PayloadAction<{ TableId: string }>) => {
            const { TableId } = action.payload;
            if (state[TableId]) {
                state[TableId] = [];
            }
        },
        setInitialTableChild: () => {
            return initialState
        }
    },
});

export const { addTableChild, removeTableChild, clearTableChildren, setInitialTableChild } = tableChildSlice.actions;

export default tableChildSlice.reducer;
