
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AsideChildState {
    [AsideId: string]: string[];
}

const initialState: AsideChildState = {};

const asideChildSlice = createSlice({
    name: 'asideChild',
    initialState,
    reducers: {
        addAsideChild: (state, action: PayloadAction<{ AsideId: string, componentName: string }>) => {
            const { AsideId, componentName } = action.payload;
            if (!state[AsideId]) {
                state[AsideId] = [];
            }
            state[AsideId].push(componentName);
        },
        removeAsideChild: (state, action: PayloadAction<{ AsideId: string, componentIndex: number }>) => {
            const { AsideId, componentIndex } = action.payload;

            if (state[AsideId]) {
                delete state[AsideId][componentIndex];
            }
        },
        clearAsideChildren: (state, action: PayloadAction<{ AsideId: string }>) => {
            const { AsideId } = action.payload;
            if (state[AsideId]) {
                state[AsideId] = [];
            }
        },
        setInitialAsideChild: () => {
            return initialState;
        }
    },
});

export const { addAsideChild, removeAsideChild, clearAsideChildren, setInitialAsideChild } = asideChildSlice.actions;

export default asideChildSlice.reducer;
