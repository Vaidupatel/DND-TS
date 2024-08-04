import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ParagraphChildState {
    [ParagraphId: string]: string[];
}

const initialState: ParagraphChildState = {};

const paragraphChildSlice = createSlice({
    name: 'paragraphChild',
    initialState,
    reducers: {
        addParagraphChild: (state, action: PayloadAction<{ ParagraphId: string, componentName: string }>) => {
            const { ParagraphId, componentName } = action.payload;
            if (!state[ParagraphId]) {
                state[ParagraphId] = [];
            }
            state[ParagraphId].push(componentName);
        },
        removeParagraphChild: (state, action: PayloadAction<{ ParagraphId: string, componentIndex: number }>) => {
            const { ParagraphId, componentIndex } = action.payload;
            if (state[ParagraphId]) {
                state[ParagraphId] = state[ParagraphId].filter((_, index) => index !== componentIndex);
            }
        },
        clearParagraphChildren: (state, action: PayloadAction<{ ParagraphId: string }>) => {
            const { ParagraphId } = action.payload;
            if (state[ParagraphId]) {
                state[ParagraphId] = [];
            }
        },
        setInitialParagraphChild: () => {
            return initialState;
        }
    },
});

export const { addParagraphChild, removeParagraphChild, clearParagraphChildren, setInitialParagraphChild } = paragraphChildSlice.actions;

export default paragraphChildSlice.reducer;