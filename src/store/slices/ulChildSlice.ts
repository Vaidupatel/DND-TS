import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UlChildState {
    [UlId: string]: string[];
}

const initialState: UlChildState = {};

const ulChildSlice = createSlice({
    name: 'ulChild',
    initialState,
    reducers: {
        addUlChild: (state, action: PayloadAction<{ UlId: string, componentName: string }>) => {
            const { UlId, componentName } = action.payload;
            if (!state[UlId]) {
                state[UlId] = [];
            }
            state[UlId].push(componentName);
        },
        removeUlChild: (state, action: PayloadAction<{ UlId: string, componentIndex: number }>) => {
            const { UlId, componentIndex } = action.payload;
            if (state[UlId]) {
                delete state[UlId][componentIndex];
            }
        },
        clearUlChildren: (state, action: PayloadAction<{ UlId: string }>) => {
            const { UlId } = action.payload;
            if (state[UlId]) {
                state[UlId] = [];
            }
        },
        setInitialUlChild: () => {
            return initialState
        }
    },
});

export const { addUlChild, removeUlChild, clearUlChildren, setInitialUlChild } = ulChildSlice.actions;

export default ulChildSlice.reducer;
