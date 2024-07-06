
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FigureChildState {
    [FigureId: string]: string[];
}

const initialState: FigureChildState = {};

const figureChildSlice = createSlice({
    name: 'figureChild',
    initialState,
    reducers: {
        addFigureChild: (state, action: PayloadAction<{ FigureId: string, componentName: string }>) => {
            const { FigureId, componentName } = action.payload;
            if (!state[FigureId]) {
                state[FigureId] = [];
            }
            state[FigureId].push(componentName);
        },
        removeFigureChild: (state, action: PayloadAction<{ FigureId: string, componentIndex: number }>) => {
            const { FigureId, componentIndex } = action.payload;
            if (state[FigureId]) {
                delete state[FigureId][componentIndex];
            }
        },
        clearFigureChildren: (state, action: PayloadAction<{ FigureId: string }>) => {
            const { FigureId } = action.payload;
            if (state[FigureId]) {
                state[FigureId] = [];
            }
        },
        setInitialFigureChild: () => {
            return initialState
        }
    },
});

export const { addFigureChild, removeFigureChild, clearFigureChildren, setInitialFigureChild } = figureChildSlice.actions;

export default figureChildSlice.reducer;
