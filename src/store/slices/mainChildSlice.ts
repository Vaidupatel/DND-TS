
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MainChildState {
    [MainId: string]: string[];
}

const initialState: MainChildState = {};

const mainChildSlice = createSlice({
    name: 'mainChild',
    initialState,
    reducers: {
        addMainChild: (state, action: PayloadAction<{ MainId: string, componentName: string }>) => {
            const { MainId, componentName } = action.payload;
            if (!state[MainId]) {
                state[MainId] = [];
            }
            state[MainId].push(componentName);
        },
        removeMainChild: (state, action: PayloadAction<{ MainId: string, componentIndex: number }>) => {
            const { MainId, componentIndex } = action.payload;
            if (state[MainId]) {
                delete state[MainId][componentIndex];
            }
        },
        clearMainChildren: (state, action: PayloadAction<{ MainId: string }>) => {
            const { MainId } = action.payload;
            if (state[MainId]) {
                state[MainId] = [];
            }
        },
        setInitialMainChild: () => {
            return initialState
        }
    },
});

export const { addMainChild, removeMainChild, clearMainChildren, setInitialMainChild } = mainChildSlice.actions;

export default mainChildSlice.reducer;
