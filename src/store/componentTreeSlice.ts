import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComponentNode {
    id: string;
    type: string;
    children: string[];
}

interface ComponentTreeState {
    components: { [id: string]: ComponentNode };
    rootIds: string[];
}

const initialState: ComponentTreeState = {
    components: {},
    rootIds: [],
};

const componentTreeSlice = createSlice({
    name: 'componentTree',
    initialState,
    reducers: {
        addComponent: (state, action: PayloadAction<{ id: string; type: string; parentId?: string }>) => {
            const { id, type, parentId } = action.payload;
            state.components[id] = { id, type, children: [] };
            if (parentId) {
                state.components[parentId].children.push(id);
            } else {
                state.rootIds.push(id);
            }
        },
        removeComponent: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const component = state.components[id];
            if (component) {
                // Remove from parent's children array
                const parentId = Object.keys(state.components).find(
                    (key) => state.components[key].children.includes(id)
                );
                if (parentId) {
                    state.components[parentId].children = state.components[parentId].children.filter(
                        (childId) => childId !== id
                    );
                } else {
                    state.rootIds = state.rootIds.filter((rootId) => rootId !== id);
                }
                // Recursively remove all children
                const removeRecursive = (componentId: string) => {
                    const comp = state.components[componentId];
                    if (comp) {
                        comp.children.forEach(removeRecursive);
                        delete state.components[componentId];
                    }
                };
                removeComponent(id);
            }
        },
        clearComponents: (state) => {
            state.components = {};
            state.rootIds = [];
        },
    },
});

export const { addComponent, removeComponent, clearComponents } = componentTreeSlice.actions;
export default componentTreeSlice.reducer;