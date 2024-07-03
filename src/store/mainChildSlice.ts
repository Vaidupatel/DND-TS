
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
                state[MainId].splice(componentIndex, 1);
            }
        },
        clearMainChildren: (state, action: PayloadAction<{ MainId: string }>) => {
            const { MainId } = action.payload;
            if (state[MainId]) {
                state[MainId] = [];
            }
        },
    },
});

export const { addMainChild, removeMainChild, clearMainChildren } = mainChildSlice.actions;

export default mainChildSlice.reducer;
