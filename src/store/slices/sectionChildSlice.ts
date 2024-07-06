
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SectionChildState {
    [SectionId: string]: string[];
}

const initialState: SectionChildState = {};

const sectoinChildSlice = createSlice({
    name: 'sectionChild',
    initialState,
    reducers: {
        addSectionChild: (state, action: PayloadAction<{ SectionId: string, componentName: string }>) => {
            const { SectionId, componentName } = action.payload;
            if (!state[SectionId]) {
                state[SectionId] = [];
            }
            state[SectionId].push(componentName);
        },
        removeSectionChild: (state, action: PayloadAction<{ SectionId: string, componentIndex: number }>) => {
            const { SectionId, componentIndex } = action.payload;
            if (state[SectionId]) {
                delete state[SectionId][componentIndex];
            }
        },
        clearSectionChildren: (state, action: PayloadAction<{ SectionId: string }>) => {
            const { SectionId } = action.payload;
            if (state[SectionId]) {
                state[SectionId] = [];
            }
        },
        setInitialSectionChild: () => {
            return initialState
        }
    },
});

export const { addSectionChild, removeSectionChild, clearSectionChildren, setInitialSectionChild } = sectoinChildSlice.actions;

export default sectoinChildSlice.reducer;
