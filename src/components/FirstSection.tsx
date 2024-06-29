import React, { useState } from 'react';
import './FirstSection.css';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from './Draggable';
import CanvasToolBar from './CanvasToolBar';
import Droppable from './Droppable';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

import { addComponentName, removeComponentName, clearComponentNames } from '../store/componentNamesSlice';

const scaleFactor: number = 0.8; // 80% of the original size

const originalWidth: number = window.innerWidth;
const originalHeight: number = window.innerHeight;

const canvasWidth = originalWidth * scaleFactor;
const canvasHeight = originalHeight * scaleFactor;

const componentsObject: { [key: number]: string } = {
    1: 'div',
    2: 'span',
    3: 'section',
    4: 'header',
    5: 'footer',
    6: 'main',
    7: 'article',
    8: 'aside',
    9: 'nav',
    10: 'ul',
    11: 'ol',
    12: 'dl',
    13: 'fieldset',
    14: 'form',
    15: 'table',
    16: 'iframe',
    17: 'figure',
};

const FirstSection: React.FC = () => {
    const heroSection = styles[0].heroSection!;
    const component = styles[0].component!;
    const componentList = styles[0].componentList!;
    const droppableCanvas = styles[0].droppableCanvas!;
    const addedComponentsList = styles[0].addedComponentsList!;
    const addedComponentsListData = styles[0].addedComponentsListData!;
    const listItemStyle = styles[0].listItemStyle!;

    const componentNames = useSelector((state: RootState) => state.componentNames.names);
    const dispatch = useDispatch<AppDispatch>();

    // State to manage currently opened context menu
    const [contextMenuIndex, setContextMenuIndex] = useState<number | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && over.id === 'droppable') {
            const componentName = componentsObject[Number(active.id)];
            if (componentName) {
                dispatch(addComponentName(componentName));
            }
        }
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        event.preventDefault();

        if (contextMenuIndex !== null) {
            const previousContextMenu = document.getElementById(`context-menu-${contextMenuIndex}`);
            if (previousContextMenu) {
                previousContextMenu.remove();
            }
        }

        const contextMenu = document.createElement('div');
        contextMenu.id = `context-menu-${index}`;
        contextMenu.className = 'context-menu';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'button';
        removeButton.addEventListener('click', () => {
            dispatch(removeComponentName(index));
            contextMenu.remove();
        });

        contextMenu.appendChild(removeButton);
        document.body.appendChild(contextMenu);

        // Calculate position based on mouse click
        const posX = event.clientX;
        const posY = event.clientY;

        // Set position of context menu
        contextMenu.style.position = 'absolute';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;

        // Update current context menu index
        setContextMenuIndex(index);

        // Remove context menu on outside click
        document.addEventListener('click', (e) => {
            if (!(contextMenu.contains(e.target as Node))) {
                contextMenu.remove();
                setContextMenuIndex(null);
            }
        });
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <section style={heroSection}>
                <div style={component}>
                    <div>
                        <CanvasToolBar />
                    </div>
                    <div style={componentList} className='componentsList'>
                        <div>
                            {Object.entries(componentsObject).map(([key, component]) => (
                                <Draggable key={key} id={key} content={component} />
                            ))}
                        </div>
                        <div style={droppableCanvas} className='droppableCanvas'>
                            <Droppable />
                            <div style={addedComponentsList}>
                                <p>Added Components:</p>
                                <ul style={addedComponentsListData}>
                                    {componentNames.map((name, index) => (
                                        <li style={listItemStyle} key={index} onContextMenu={(e) => handleContextMenu(e, index)}>
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                                <button className='button' onClick={() => dispatch(clearComponentNames())}>Clear all components</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DndContext>
    );
};

export default FirstSection;

const styles: {
    heroSection?: React.CSSProperties,
    component?: React.CSSProperties,
    componentList?: React.CSSProperties,
    droppableCanvas?: React.CSSProperties,
    addedComponentsList?: React.CSSProperties,
    addedComponentsListData?: React.CSSProperties,
    listItemStyle?: React.CSSProperties,
}[] = [
        {
            heroSection: {
                // border: '2px solid blue',
                width: '100%',
                display: 'flex',
            },
            component: {
                // border: '2px solid red',
                width: '100vw',
            },
            componentList: {
                border: '2px solid red',
                width: '100%',
                height: `${canvasHeight}px`,
                overflow: 'scroll',
                display: 'flex',
            },
            droppableCanvas: {
                border: '2px solid black',
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`,
            },
            addedComponentsList: {
                // border: '2px solid ',
                listStyle: 'none',
            },
            addedComponentsListData: {
                // border: '2px solid red',
                padding: '1rem',
            },
            listItemStyle: {
                // border: '2px solid',
                listStyle: 'square',
            },
        },
    ];



