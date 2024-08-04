import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { removeUlChild } from '../../store/slices/ulChildSlice';
import { removeOlChild } from '../../store/slices/olChildSlice';
import { removeDlChild } from '../../store/slices/dlChildSlice';
import { removeFieldSetChild } from '../../store/slices/fieldsetChildSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';
import { removeTableChild } from '../../store/slices/tableChildSlice';
import { removeIFrameChild } from '../../store/slices/iFrameChildSlice';
import { removeFigureChild } from '../../store/slices/figureChildSlice';
import SpanComponent from './SpanComponent ';



interface ParagraphComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    depth: number;
    maxDepth?: number;
    draggedItemType: string | null;
}


let currentContextMenu: HTMLDivElement | null = null;

const ParagraphComponent: React.FC<ParagraphComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove, draggedItemType }) => {

    const dispatch = useDispatch();
    const droppableParagraphId = `droppableP-${parentID}-${childIndex}`;
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);

    const { isOver, setNodeRef: setNodeParagraph } = useDroppable({
        id: droppableParagraphId,
        data: {
            accepts: ["span", "a", "s", "code"],
            childIndex,
            parentID,
        },
    });

    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [childrenData, setChildrenData] = useState<Record<string, { html: string, css: string }>>({});

    const styleOptions = useMemo(() => [
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
        { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
        { label: 'Text Align', type: 'text', name: 'textAlign', value: baseStyles.textAlign ? String(baseStyles.textAlign) : '' },
        { label: 'Line Height', type: 'text', name: 'lineHeight', value: baseStyles.lineHeight ? String(baseStyles.lineHeight) : '' },
        { label: 'Font Weight', type: 'text', name: 'fontWeight', value: baseStyles.fontWeight ? String(baseStyles.fontWeight) : '' },
        { label: 'Font Style', type: 'text', name: 'fontStyle', value: baseStyles.fontStyle ? String(baseStyles.fontStyle) : '' },
        { label: 'Text Decoration', type: 'text', name: 'textDecoration', value: baseStyles.textDecoration ? String(baseStyles.textDecoration) : '' },
    ], [baseStyles]);

    const combinedParagraphStyles = {
        border: '1px dashed blue',
        backgroundColor: isOver ? '#E6F7FF' : baseStyles.backgroundColor,
        outline: 'none',
        cursor: !isOver ? 'default' : isOver && (draggedItemType !== null && ["span", "a", "s", "code"].includes(draggedItemType))
            ? 'default'
            : 'not-allowed',
        ...baseStyles,
    };

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
        if (paragraphRef.current) {
            let mergedChildrenHTML = '';
            let mergedChildrenCSS = '';
            Object.values(childrenData).forEach(data => {
                mergedChildrenHTML += data.html;
                mergedChildrenCSS += data.css;
            });

            const htmlString = `<p class="${droppableParagraphId}">${paragraphRef.current.innerHTML}${mergedChildrenHTML}</p>`;
            const cssString = `
            .${droppableParagraphId} {
                ${Object.entries(baseStyles)
                    .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                    .join('\n  ')}
            }
            ${mergedChildrenCSS}
            `;

            onUpdate(droppableParagraphId, htmlString, cssString);
        }
    }, [baseStyles, childrenData, droppableParagraphId, onUpdate]);

    const handleContentChange = () => {
        // Trigger the effect to update the content
        setChildrenData(prevData => ({ ...prevData }));
    };


    const openContextMenu = (event: React.MouseEvent<HTMLParagraphElement>) => {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();

            if (currentContextMenu) {
                currentContextMenu.remove();
            }

            const contextMenu = document.createElement('div');
            currentContextMenu = contextMenu;
            contextMenu.className = 'contextMenu';
            contextMenu.style.cursor = 'move';

            // Add draggable functionality
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            const onMouseDown = (e: MouseEvent) => {
                isDragging = true;
                offsetX = e.clientX - contextMenu.getBoundingClientRect().left;
                offsetY = e.clientY - contextMenu.getBoundingClientRect().top;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };

            const onMouseMove = (e: MouseEvent) => {
                if (isDragging) {
                    contextMenu.style.left = `${e.clientX - offsetX}px`;
                    contextMenu.style.top = `${e.clientY - offsetY}px`;
                }
            };

            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            contextMenu.addEventListener('mousedown', onMouseDown);

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
                onRemove(droppableParagraphId)
                currentContextMenu = null;
            });


            const styleButtons = [
                { label: 'Bold', command: 'bold' },
                { label: 'Italic', command: 'italic' },
                { label: 'Underline', command: 'underline' },
                { label: 'Strikethrough', command: 'strikeThrough' },
                { label: 'Subscript', command: 'subscript' },
                { label: 'Superscript', command: 'superscript' },
                { label: 'Align Left', command: 'justifyLeft' },
                { label: 'Align Center', command: 'justifyCenter' },
                { label: 'Align Right', command: 'justifyRight' },
                { label: 'Justify', command: 'justifyFull' },
                { label: 'Indent', command: 'indent' },
                { label: 'Outdent', command: 'outdent' },
                { label: 'Small', command: 'fontSize', value: '1' },
                { label: 'Cite', command: 'insertHTML', value: '<cite>$&</cite>' },
                { label: 'Line Break', command: 'insertHTML', value: '<br>' },
                { label: 'Pre', command: 'insertHTML', value: '<pre>$&</pre>' },
                { label: 'Mark', command: 'insertHTML', value: '<mark>$&</mark>' },
            ];

            const styleButtonDiv = document.createElement('div');
            styleButtonDiv.style.display = 'grid'
            styleButtonDiv.style.gridTemplateColumns = 'repeat(2, 1fr)';

            styleButtons.forEach(button => {
                const styleButton = document.createElement('button');
                styleButton.textContent = button.label;
                styleButton.className = 'button';
                styleButton.addEventListener('click', () => applyStyle(button.command, button.value));
                styleButtonDiv.appendChild(styleButton);
            });

            contextMenu.appendChild(styleButtonDiv);

            const applyStyle = (command: string, value?: string) => {
                if (value) {
                    if (command === 'insertHTML') {
                        const selection = window.getSelection();
                        if (selection && selection.rangeCount > 0) {
                            const range = selection.getRangeAt(0);
                            const selectedText = range.toString();
                            const newHtml = value.replace('$&', selectedText);
                            document.execCommand(command, false, newHtml);
                        } else {
                            document.execCommand(command, false, value);
                        }
                    } else {
                        document.execCommand(command, false, value);
                    }
                } else {
                    document.execCommand(command, false);
                }
                handleContentChange();
            };



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

            const createInputField = (labelText: string, inputType: string, name: string, value: string | undefined) => {
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
                    setBaseStyles((prevStyles) => ({
                        ...prevStyles,
                        [name]: newValue
                    }));
                });

                fieldContainer.appendChild(label);
                fieldContainer.appendChild(input);
                styleForm.appendChild(fieldContainer);
            };

            styleOptions
                .filter(option => option.label.toLowerCase().includes(searchTerm))
                .forEach(option => createInputField(option.label, option.type, option.name, option.value));

            contextMenu.appendChild(removeButton);
            // contextMenu.appendChild(pText);
            contextMenu.appendChild(searchInput);
            contextMenu.appendChild(styleForm);
            document.body.appendChild(contextMenu);

            const posX = event.clientX;
            const posY = event.clientY;

            contextMenu.style.position = 'absolute';
            contextMenu.style.top = `${posY}px`;
            contextMenu.style.left = `${posX}px`;

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

                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Search styles...';
                searchInput.className = 'inputField';
                searchInput.value = searchTerm;
                searchInput.addEventListener('input', (e) => {
                    setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
                });
                styleOptions
                    .filter(option => option.label.toLowerCase().includes(searchTerm))
                    .forEach(option => {
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
                            setBaseStyles((prevStyles) => ({
                                ...prevStyles,
                                [option.name]: newValue
                            }));
                        });

                        fieldContainer.appendChild(label);
                        fieldContainer.appendChild(input);
                        styleForm.appendChild(fieldContainer);
                    });
            }
        }
    }, [searchTerm]);


    const selectParagraphChildren = createSelector(
        [(state: RootState) => state.paragraphChild, (_, droppableParagraphId: string) => droppableParagraphId],
        (paragraphChild, droppableParagraphId) => paragraphChild[droppableParagraphId] || []
    );
    const paragraphChildren = useSelector((state: RootState) => selectParagraphChildren(state, droppableParagraphId));


    const renderComponent = (name: string, index: number) => {
        if (depth >= maxDepth) {
            return (
                <div key={`${droppableParagraphId}-${index}`} style={{ padding: '10px', border: '1px dashed red' }}>
                    Max nesting depth reached
                </div>
            );
        }
        switch (name) {
            case 'span':
                return (
                    <SpanComponent
                        key={`${droppableParagraphId}-${index}`}
                        childIndex={index}
                        parentID={droppableParagraphId}
                        depth={depth + 1}
                        maxDepth={maxDepth}
                        draggedItemType={draggedItemType}
                        onUpdate={handleChildUpdate}
                        onRemove={handleChildRemove}
                    />
                );
            // Add cases for other allowed components
            default:
                return null;
        }
    };

    return (
        <p
            title='Paragraph'
            className={droppableParagraphId}
            ref={(node) => {
                setNodeParagraph(node);
                if (node) {
                    paragraphRef.current = node;
                }
            }}
            style={combinedParagraphStyles}
            onContextMenu={openContextMenu}
            contentEditable={true}
            onInput={handleContentChange}
            suppressContentEditableWarning={true}
        >
            Default paragraph text
            {paragraphChildren.map((name, index) => renderComponent(name, index))}
        </p>
    );
};

export default ParagraphComponent;
