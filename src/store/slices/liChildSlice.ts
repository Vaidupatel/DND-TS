
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LiChildState {
    [LiId: string]: string[];
}

const initialState: LiChildState = {};

const liChildSlice = createSlice({
    name: 'liChild',
    initialState,
    reducers: {
        addLiChild: (state, action: PayloadAction<{ LiId: string, componentName: string }>) => {
            const { LiId, componentName } = action.payload;
            if (!state[LiId]) {
                state[LiId] = [];
            }
            state[LiId].push(componentName);
        },
        removeLiChild: (state, action: PayloadAction<{ LiId: string, componentIndex: number }>) => {
            const { LiId, componentIndex } = action.payload;
            if (state[LiId]) {
                delete state[LiId][componentIndex];
            }
        },
        clearLiChildren: (state, action: PayloadAction<{ LiId: string }>) => {
            const { LiId } = action.payload;
            if (state[LiId]) {
                state[LiId] = [];
            }
        },
        setInitialLiChild: () => {
            return initialState;
        }
    },
});

export const { addLiChild, removeLiChild, clearLiChildren, setInitialLiChild } = liChildSlice.actions;

export default liChildSlice.reducer;
