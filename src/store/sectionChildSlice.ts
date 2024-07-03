
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SectionChildState {
    [sectionId: string]: string[];
}

const initialState: SectionChildState = {};

const sectoinChildSlice = createSlice({
    name: 'sectionChild',
    initialState,
    reducers: {
        addSectionChild: (state, action: PayloadAction<{ sectionId: string, componentName: string }>) => {
            const { sectionId, componentName } = action.payload;
            if (!state[sectionId]) {
                state[sectionId] = [];
            }
            state[sectionId].push(componentName);
        },
        removeSectionChild: (state, action: PayloadAction<{ sectionId: string, componentIndex: number }>) => {
            const { sectionId, componentIndex } = action.payload;
            if (state[sectionId]) {
                state[sectionId].splice(componentIndex, 1);
            }
        },
        clearSectionChildren: (state, action: PayloadAction<{ sectionId: string }>) => {
            const { sectionId } = action.payload;
            if (state[sectionId]) {
                state[sectionId] = [];
            }
        },
    },
});

export const { addSectionChild, removeSectionChild, clearSectionChildren } = sectoinChildSlice.actions;

export default sectoinChildSlice.reducer;
