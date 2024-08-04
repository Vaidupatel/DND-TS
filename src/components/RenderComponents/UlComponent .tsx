import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { useDroppable } from '@dnd-kit/core';
import { removeDivChild } from '../../store/slices/divChildListSlice';
import { removeSpanChild } from '../../store/slices/spanChildSlice';
import { removeSectionChild } from '../../store/slices/sectionChildSlice';
import { removeHeaderChild } from '../../store/slices/headerChildSlice';
import { removeFooterChild } from '../../store/slices/footerChildSlice';
import { removeMainChild } from '../../store/slices/mainChildSlice';
import { removeArticleChild } from '../../store/slices/articleChildSlice';
import { removeAsideChild } from '../../store/slices/asideChildSlice';
import { removeNavChild } from '../../store/slices/navChildSlice';
import { addUlChild, removeUlChild } from '../../store/slices/ulChildSlice';
import { removeOlChild } from '../../store/slices/olChildSlice';
import { removeDlChild } from '../../store/slices/dlChildSlice';
import { removeFieldSetChild } from '../../store/slices/fieldsetChildSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';
import { removeTableChild } from '../../store/slices/tableChildSlice';
import { removeIFrameChild } from '../../store/slices/iFrameChildSlice';
import { removeFigureChild } from '../../store/slices/figureChildSlice';
import LiComponent from './LiComponent';

interface UlComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    depth: number;
    maxDepth?: number;
    draggedItemType: string | null;

}
let currentContextMenu: HTMLDivElement | null = null;

const UlComponent: React.FC<UlComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove, draggedItemType }) => {
    const droppableUlid = `droppableUl-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setUlNodeRef } = useDroppable({
        id: droppableUlid,
        data: {
            accepts: ['li'],
            childIndex,
            parentID,
        },

    });

    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});
    const [liStyles, setLiStyles] = useState<React.CSSProperties>({});
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');



    const combinedStyles = {
        height: "10vh",

        border: '1px dashed red',
        backgroundColor: isOver ? '#C5CCD4' : baseStyles.backgroundColor,
        cursor: !isOver ? 'default' : isOver && (draggedItemType !== null && ['li'].includes(draggedItemType))
            ? 'default'
            : 'not-allowed',
        ...baseStyles,
    };

    const styleOptions = useMemo(() => [
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Height', type: 'text', name: 'height', value: baseStyles.height ? String(baseStyles.height) : '' },
        { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
        { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
        { label: 'List Style Type', type: 'text', name: 'listStyleType', value: baseStyles.listStyleType ? String(baseStyles.listStyleType) : '' },
        { label: 'List Style Position', type: 'text', name: 'listStylePosition', value: baseStyles.listStylePosition ? String(baseStyles.listStylePosition) : '' },
    ], [baseStyles]);


    const liStyleOptions = useMemo(() => [
        { label: 'Li Padding', type: 'text', name: 'padding', value: liStyles.padding ? String(liStyles.padding) : '' },
        { label: 'Li Margin', type: 'text', name: 'margin', value: liStyles.margin ? String(liStyles.margin) : '' },
        { label: 'Li Color', type: 'text', name: 'color', value: liStyles.color ? String(liStyles.color) : '' },
        { label: 'Li Font Size', type: 'text', name: 'fontSize', value: liStyles.fontSize ? String(liStyles.fontSize) : '' },
    ], [liStyles]);

    const [childrenData, setChildrenData] = useState<Record<string, { html: string, css: string }>>({});


    const handleChildUpdate = useCallback((childId: string, html: string, css: string) => {
        setChildrenData(prevData => ({
            ...prevData,
            [childId]: { html, css }
        }));
    }, []);

    const handleChildRemove = useCallback((childId: string) => {
        setChildrenData(prevData => {
            const newData = { ...prevData };
            delete newData[childId];
            return newData;
        });
    }, []);

    useEffect(() => {
        let mergedChildrenHTML = '';
        let mergedChildrenCSS = '';
        Object.values(childrenData).forEach(data => {
            mergedChildrenHTML += data.html;
            mergedChildrenCSS += data.css;
        });

        const htmlString = `<ul class="${droppableUlid}">\n${mergedChildrenHTML}</ul>`;

        let cssString = '';

        // Helper function to create CSS rules only for non-empty values
        const createCSSRule = (selector: string, styles: Record<string, string | undefined>) => {
            const validStyles = Object.entries(styles)
                .filter(([_, value]) => value !== undefined && value !== '')
                .map(([key, value]) => `  ${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n');

            if (validStyles) {
                return `${selector} {\n${validStyles}\n}\n`;
            }
            return '';
        };

        // Generate CSS for UL styles
        cssString += createCSSRule(`.${droppableUlid}`, baseStyles);

        // Generate CSS for LI styles
        // cssString += createCSSRule(`.${droppableUlid} li`, liStyles);

        // Only add merged children CSS if it's not empty
        if (mergedChildrenCSS.trim()) {
            cssString += `\n${mergedChildrenCSS}`;
        }

        // Trim any extra whitespace
        cssString = cssString.trim();

        onUpdate(droppableUlid, htmlString, cssString);
    }, [baseStyles, liStyles, childrenData, droppableUlid, onUpdate]);


    const openContextMenu = (event: React.MouseEvent<HTMLUListElement>) => {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();

            if (currentContextMenu) {
                currentContextMenu.remove();
            }

            const contextMenu = document.createElement('div');
            currentContextMenu = contextMenu;
            contextMenu.className = 'contextMenu';
            contextMenu.style.position = 'absolute';
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.style.cursor = 'move';

            // Make the context menu draggable
            let isDragging = false;
            let startX: number, startY: number;

            const startDragging = (e: MouseEvent) => {
                isDragging = true;
                startX = e.clientX - contextMenu.offsetLeft;
                startY = e.clientY - contextMenu.offsetTop;
            };

            const stopDragging = () => {
                isDragging = false;
            };

            const drag = (e: MouseEvent) => {
                if (isDragging && contextMenu) {
                    const newX = e.clientX - startX;
                    const newY = e.clientY - startY;
                    contextMenu.style.left = `${newX}px`;
                    contextMenu.style.top = `${newY}px`;
                }
            };

            contextMenu.addEventListener('mousedown', startDragging);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDragging);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'button';
            removeButton.addEventListener('click', () => {
                if (parentID === 'droppable') {
                    dispatch(removeComponentName(childIndex));
                }
                else if (parentID.startsWith('droppableDiv-')) {
                    dispatch(removeDivChild({ DivId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableSpan-')) {
                    dispatch(removeSpanChild({ SpanId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppablesection-')) {
                    dispatch(removeSectionChild({ SectionId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableHeader-')) {
                    dispatch(removeHeaderChild({ HeaderId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableFooter-')) {
                    dispatch(removeFooterChild({ FooterId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableMain-')) {
                    dispatch(removeMainChild({ MainId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableArticle-')) {
                    dispatch(removeArticleChild({ ArticleId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableAside-')) {
                    dispatch(removeAsideChild({ AsideId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableNav-')) {
                    dispatch(removeNavChild({ NavId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableUl-')) {
                    dispatch(removeUlChild({ UlId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableOl-')) {
                    dispatch(removeOlChild({ OlId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableDl-')) {
                    dispatch(removeDlChild({ DlId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableFieldSet-')) {
                    dispatch(removeFieldSetChild({ FieldSetId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableForm-')) {
                    dispatch(removeFormChild({ FormId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableTable-')) {
                    dispatch(removeTableChild({ TableId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableIFrame-')) {
                    dispatch(removeIFrameChild({ IFrameId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableFigure-')) {
                    dispatch(removeFigureChild({ FigureId: parentID, componentIndex: childIndex }));
                }
                contextMenu.remove();
                onRemove(droppableUlid)
                currentContextMenu = null;
            });

            const addLiButton = document.createElement('button');
            addLiButton.textContent = 'Add List Item';
            addLiButton.className = 'button';
            addLiButton.addEventListener('click', () => {
                dispatch(addUlChild({ UlId: droppableUlid, componentName: 'li' }));
                contextMenu.remove();
                currentContextMenu = null;
            });
            const styleForm = document.createElement('form');
            styleForm.className = 'style-form';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search styles...';
            searchInput.className = 'inputField';
            searchInput.value = searchTerm;
            searchInput.addEventListener('input', (e) => {
                setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
            });

            const createInputField = (labelText: string, inputType: string, name: string, value: string | undefined, isLiStyle: boolean = false) => {
                const fieldContainer = document.createElement('div');

                const label = document.createElement('label');
                label.textContent = labelText;
                label.htmlFor = name;

                const input = document.createElement('input');
                input.className = 'inputField';
                input.type = inputType;
                input.name = name;
                input.value = value || '';

                input.addEventListener('input', (e) => {
                    const target = e.target as HTMLInputElement;
                    const newValue = target.value;
                    if (isLiStyle) {
                        setLiStyles((prevStyles) => ({
                            ...prevStyles,
                            [name]: newValue
                        }));
                    } else {
                        setBaseStyles((prevStyles) => ({
                            ...prevStyles,
                            [name]: newValue
                        }));
                    }
                });

                fieldContainer.appendChild(label);
                fieldContainer.appendChild(input);
                styleForm.appendChild(fieldContainer);
            };

            styleOptions
                .filter(option => option.label.toLowerCase().includes(searchTerm))
                .forEach(option => createInputField(option.label, option.type, option.name, option.value));

            liStyleOptions
                .filter(option => option.label.toLowerCase().includes(searchTerm))
                .forEach(option => createInputField(option.label, option.type, option.name, option.value, true));

            contextMenu.appendChild(removeButton);
            contextMenu.appendChild(addLiButton);
            contextMenu.appendChild(searchInput);
            contextMenu.appendChild(styleForm);
            document.body.appendChild(contextMenu);

            const posX = event.clientX;
            const posY = event.clientY;

            contextMenu.style.position = 'absolute';
            contextMenu.style.top = `${posY} px`;
            contextMenu.style.left = `${posX} px`;

            const handleClickOutside = (e: MouseEvent) => {
                if (!contextMenu.contains(e.target as Node)) {
                    contextMenu.remove();
                    document.removeEventListener('click', handleClickOutside);
                    currentContextMenu = null;
                }
            };

            document.addEventListener('click', handleClickOutside);
        }
    }

    useEffect(() => {
        if (currentContextMenu) {
            const styleForm = currentContextMenu.querySelector('.style-form');
            if (styleForm) {
                while (styleForm.firstChild) {
                    styleForm.removeChild(styleForm.firstChild);
                }


                const createInputField = (option: { label: string, type: string, name: string, value: string }, isLiStyle: boolean = false) => {
                    const fieldContainer = document.createElement('div');

                    const label = document.createElement('label');
                    label.textContent = option.label;
                    label.htmlFor = option.name;

                    const input = document.createElement('input');
                    input.className = 'inputField';
                    input.type = option.type;
                    input.name = option.name;
                    input.value = option.value || '';

                    input.addEventListener('input', (e) => {
                        const target = e.target as HTMLInputElement;
                        const newValue = target.value;
                        if (isLiStyle) {
                            setLiStyles((prevStyles) => ({
                                ...prevStyles,
                                [option.name]: newValue
                            }));
                        } else {
                            setBaseStyles((prevStyles) => ({
                                ...prevStyles,
                                [option.name]: newValue
                            }));
                        }
                    });

                    fieldContainer.appendChild(label);
                    fieldContainer.appendChild(input);
                    styleForm.appendChild(fieldContainer);
                };

                styleOptions
                    .filter(option => option.label.toLowerCase().includes(searchTerm))
                    .forEach(option => createInputField(option));

                liStyleOptions
                    .filter(option => option.label.toLowerCase().includes(searchTerm))
                    .forEach(option => createInputField(option, true));
            }
        }
    }, [searchTerm]);


    const selectUlChildren = createSelector(
        [(state: RootState) => state.ulChild, (_, droppableUlid: string) => droppableUlid],
        (ulChild, droppableUlid) => ulChild[droppableUlid] || []
    );
    const ulChildren = useSelector((state: RootState) => selectUlChildren(state, droppableUlid));



    const renderComponent = (name: string, index: number) => {
        if (depth >= maxDepth) {
            return (
                <div key={`${droppableUlid} -${index} `} style={{ padding: '10px', border: '1px dashed red' }}>
                    Max nesting depth reached
                </div>
            );
        }
        switch (name) {
            case 'li':
                return <LiComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableUlid}
                    depth={depth + 1}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            default:
                return null; // Handle default case if necessary
        }
    };
    return (
        <ul
            title='Un Orderd List'
            className={droppableUlid}
            ref={setUlNodeRef}
            style={combinedStyles}
            onContextMenu={openContextMenu}
        >
            {ulChildren.map((name: string, index: number) => renderComponent(name, index))}
        </ul>
    );
};

export default UlComponent;
