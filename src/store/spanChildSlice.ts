


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SpanChildState {
    [divId: string]: string[];
}

const initialState: SpanChildState = {};

const SpanChildSlice = createSlice({
    name: 'apanChild',
    initialState,
    reducers: {
        addSpanChild: (state, action: PayloadAction<{ spanId: string, componentName: string }>) => {
            const { spanId, componentName } = action.payload;
            if (!state[spanId]) {
                state[spanId] = [];
            }
            state[spanId].push(componentName);
        },
        removeSpanChild: (state, action: PayloadAction<{ spanId: string, componentIndex: number }>) => {
            const { spanId, componentIndex } = action.payload;
            if (state[spanId]) {
                state[spanId].splice(componentIndex, 1);
            }
        },
        clearSpanChildren: (state, action: PayloadAction<{ spanId: string }>) => {
            const { spanId } = action.payload;
            if (state[spanId]) {
                state[spanId] = [];
            }
        },
    },
});

export const { addSpanChild, removeSpanChild, clearSpanChildren } = SpanChildSlice.actions;

export default SpanChildSlice.reducer;
