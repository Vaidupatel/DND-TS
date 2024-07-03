
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FooterChildState {
    [footerId: string]: string[];
}

const initialState: FooterChildState = {};

const footerChildSlice = createSlice({
    name: 'footerChild',
    initialState,
    reducers: {
        addFooterChild: (state, action: PayloadAction<{ FooterId: string, componentName: string }>) => {
            const { FooterId, componentName } = action.payload;
            if (!state[FooterId]) {
                state[FooterId] = [];
            }
            state[FooterId].push(componentName);
        },
        removeFooterChild: (state, action: PayloadAction<{ FooterId: string, componentIndex: number }>) => {
            const { FooterId, componentIndex } = action.payload;
            if (state[FooterId]) {
                state[FooterId].splice(componentIndex, 1);
            }
        },
        clearFooterChildren: (state, action: PayloadAction<{ FooterId: string }>) => {
            const { FooterId } = action.payload;
            if (state[FooterId]) {
                state[FooterId] = [];
            }
        },
    },
});

export const { addFooterChild, removeFooterChild, clearFooterChildren } = footerChildSlice.actions;

export default footerChildSlice.reducer;
