


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SpanChildState {
    [divId: string]: string[];
}

const initialState: SpanChildState = {};

const SpanChildSlice = createSlice({
    name: 'apanChild',
    initialState,
    reducers: {
        addSpanChild: (state, action: PayloadAction<{ SpanId: string, componentName: string }>) => {
            const { SpanId, componentName } = action.payload;
            if (!state[SpanId]) {
                state[SpanId] = [];
            }
            state[SpanId].push(componentName);
        },
        removeSpanChild: (state, action: PayloadAction<{ SpanId: string, componentIndex: number }>) => {
            const { SpanId, componentIndex } = action.payload;
            if (state[SpanId]) {
                delete state[SpanId][componentIndex];
            }
        },
        clearSpanChildren: (state, action: PayloadAction<{ SpanId: string }>) => {
            const { SpanId } = action.payload;
            if (state[SpanId]) {
                state[SpanId] = [];
            }
        },
        setInitialSpanChild: () => {
            return initialState
        }
    },
});

export const { addSpanChild, removeSpanChild, clearSpanChildren, setInitialSpanChild } = SpanChildSlice.actions;

export default SpanChildSlice.reducer;
