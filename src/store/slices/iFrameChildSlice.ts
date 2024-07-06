
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFrameChildState {
    [IFrameId: string]: string[];
}

const initialState: IFrameChildState = {};

const iFrameChildSlice = createSlice({
    name: 'iFrameChild',
    initialState,
    reducers: {
        addIFrameChild: (state, action: PayloadAction<{ IFrameId: string, componentName: string }>) => {
            const { IFrameId, componentName } = action.payload;
            if (!state[IFrameId]) {
                state[IFrameId] = [];
            }
            state[IFrameId].push(componentName);
        },
        removeIFrameChild: (state, action: PayloadAction<{ IFrameId: string, componentIndex: number }>) => {
            const { IFrameId, componentIndex } = action.payload;
            if (state[IFrameId]) {
                delete state[IFrameId][componentIndex];
            }
        },
        clearIFrameChildren: (state, action: PayloadAction<{ IFrameId: string }>) => {
            const { IFrameId } = action.payload;
            if (state[IFrameId]) {
                state[IFrameId] = [];
            }
        },
        setInitialIFrameChild: () => {
            return initialState
        }
    },
});

export const { addIFrameChild, removeIFrameChild, clearIFrameChildren,setInitialIFrameChild } = iFrameChildSlice.actions;

export default iFrameChildSlice.reducer;
