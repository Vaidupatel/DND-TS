
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OlChildState {
    [OlId: string]: string[];
}

const initialState: OlChildState = {};

const olChildSlice = createSlice({
    name: 'olChild',
    initialState,
    reducers: {
        addOlChild: (state, action: PayloadAction<{ OlId: string, componentName: string }>) => {
            const { OlId, componentName } = action.payload;
            if (!state[OlId]) {
                state[OlId] = [];
            }
            state[OlId].push(componentName);
        },
        removeOlChild: (state, action: PayloadAction<{ OlId: string, componentIndex: number }>) => {
            const { OlId, componentIndex } = action.payload;
            if (state[OlId]) {
                delete state[OlId][componentIndex];
            }
        },
        clearOlChildren: (state, action: PayloadAction<{ OlId: string }>) => {
            const { OlId } = action.payload;
            if (state[OlId]) {
                state[OlId] = [];
            }
        },
        setInitialOlChild: () => {
            return initialState
        }
    },
});

export const { addOlChild, removeOlChild, clearOlChildren, setInitialOlChild } = olChildSlice.actions;

export default olChildSlice.reducer;
