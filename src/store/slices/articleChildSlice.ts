
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ArticleChildState {
    [ArticleId: string]: string[];
}

const initialState: ArticleChildState = {};

const articleChildSlice = createSlice({
    name: 'articleChild',
    initialState,
    reducers: {
        addArticleChild: (state, action: PayloadAction<{ ArticleId: string, componentName: string }>) => {
            const { ArticleId, componentName } = action.payload;
            if (!state[ArticleId]) {
                state[ArticleId] = [];
            }
            state[ArticleId].push(componentName);
        },
        removeArticleChild: (state, action: PayloadAction<{ ArticleId: string, componentIndex: number }>) => {
            const { ArticleId, componentIndex } = action.payload;
            if (state[ArticleId]) {
                delete state[ArticleId][componentIndex];
            }
        },
        clearArticleChildren: (state, action: PayloadAction<{ ArticleId: string }>) => {
            const { ArticleId } = action.payload;
            if (state[ArticleId]) {
                state[ArticleId] = [];
            }
        },
        setInitialArticleChild: () => {
            return initialState;
        }
    },
});

export const { addArticleChild, removeArticleChild, clearArticleChildren, setInitialArticleChild } = articleChildSlice.actions;

export default articleChildSlice.reducer;
