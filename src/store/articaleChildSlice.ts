
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ArticaleChildState {
    [ArticaleId: string]: string[];
}

const initialState: ArticaleChildState = {};

const articaleChildSlice = createSlice({
    name: 'articaleChild',
    initialState,
    reducers: {
        addArticaleChild: (state, action: PayloadAction<{ ArticaleId: string, componentName: string }>) => {
            const { ArticaleId, componentName } = action.payload;
            if (!state[ArticaleId]) {
                state[ArticaleId] = [];
            }
            state[ArticaleId].push(componentName);
        },
        removeArticaleChild: (state, action: PayloadAction<{ ArticaleId: string, componentIndex: number }>) => {
            const { ArticaleId, componentIndex } = action.payload;
            if (state[ArticaleId]) {
                state[ArticaleId].splice(componentIndex, 1);
            }
        },
        clearArticaleChildren: (state, action: PayloadAction<{ ArticaleId: string }>) => {
            const { ArticaleId } = action.payload;
            if (state[ArticaleId]) {
                state[ArticaleId] = [];
            }
        },
    },
});

export const { addArticaleChild, removeArticaleChild, clearArticaleChildren } = articaleChildSlice.actions;

export default articaleChildSlice.reducer;
