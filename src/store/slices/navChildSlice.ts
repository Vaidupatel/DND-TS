
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavChildState {
    [NavId: string]: string[];
}

const initialState: NavChildState = {};

const navChildSlice = createSlice({
    name: 'navChild',
    initialState,
    reducers: {
        addNavChild: (state, action: PayloadAction<{ NavId: string, componentName: string }>) => {
            const { NavId, componentName } = action.payload;
            if (!state[NavId]) {
                state[NavId] = [];
            }
            state[NavId].push(componentName);
        },
        removeNavChild: (state, action: PayloadAction<{ NavId: string, componentIndex: number }>) => {
            const { NavId, componentIndex } = action.payload;
            if (state[NavId]) {
                delete state[NavId][componentIndex];
            }
        },
        clearNavChildren: (state, action: PayloadAction<{ NavId: string }>) => {
            const { NavId } = action.payload;
            if (state[NavId]) {
                state[NavId] = [];
            }
        },
        setInitialNavChild: () => {
            return initialState
        }
    },
});

export const { addNavChild, removeNavChild, clearNavChildren, setInitialNavChild } = navChildSlice.actions;

export default navChildSlice.reducer;
