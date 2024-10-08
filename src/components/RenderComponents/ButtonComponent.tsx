import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './ContextMenu.css';
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
import { removeFormChild } from '../../store/slices/formChildSlice';
import { removeTableChild } from '../../store/slices/tableChildSlice';
import { removeIFrameChild } from '../../store/slices/iFrameChildSlice';
import { removeFigureChild } from '../../store/slices/figureChildSlice';
import { removeComponentName } from '../../store/slices/componentNamesSlice';

interface ButtonComponentProps {
    childIndex: number;
    parentID: string;
    draggedItemType: string | null;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
}

let currentContextMenu: HTMLDivElement | null = null;

const ButtonComponent: React.FC<ButtonComponentProps> = ({ childIndex, parentID, draggedItemType, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [buttonData, setButtonData] = useState({
        text: 'Click me!',
        type: 'button',
        disabled: false,
        name: '',
        value: '',
    });
    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});
    // const [children, setChildren] = useState<React.ReactNode[]>([]);

    const buttonId = `droppableButton-${parentID}-${childIndex}`;

    const combinedStyles = {
        ...baseStyles,
    };

    const styleOptions = [
        { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
        { label: 'Height', type: 'text', name: 'height', value: baseStyles.height ? String(baseStyles.height) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '#ffffff' },
        { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '#000000' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
        { label: 'Cursor', type: 'text', name: 'cursor', value: baseStyles.cursor ? String(baseStyles.cursor) : '' },
    ];

    const openContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            } else if (parentID.startsWith('droppableSection-')) {
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
            onRemove(buttonId);
            currentContextMenu = null;
        });

        const styleForm = document.createElement('form');

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search styles...';
        searchInput.className = 'inputField';
        searchInput.value = searchTerm;
        searchInput.addEventListener('input', (e) => {
            setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
        });

        const createInputField = (labelText: string, inputType: string, name: string, value: string | boolean) => {
            const fieldContainer = document.createElement('div');

            const label = document.createElement('label');
            label.textContent = labelText;
            label.htmlFor = name;

            const input = document.createElement('input');
            input.className = 'inputField';
            input.type = inputType;
            input.name = name;

            if (inputType === 'checkbox') {
                (input as HTMLInputElement).checked = value as boolean;
            } else {
                input.value = value as string;
            }

            input.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                const newValue = target.type === 'checkbox' ? target.checked : target.value;
                if (['text', 'type', 'disabled', 'name', 'value'].includes(name)) {
                    setButtonData((prevData) => ({
                        ...prevData,
                        [name]: newValue,
                    }));
                } else {
                    setBaseStyles((prevStyles) => ({
                        ...prevStyles,
                        [name]: newValue,
                    }));
                }
            });

            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            styleForm.appendChild(fieldContainer);
        };

        // Add button-specific fields
        createInputField('Button Text', 'text', 'text', buttonData.text);
        createInputField('Button Type', 'text', 'type', buttonData.type);
        createInputField('Disabled', 'checkbox', 'disabled', buttonData.disabled);
        createInputField('Name', 'text', 'name', buttonData.name);
        createInputField('Value', 'text', 'value', buttonData.value);

        styleOptions
            .filter(option => option.label.toLowerCase().includes(searchTerm))
            .forEach(option => {
                createInputField(option.label, option.type, option.name, option.value);
            });



        contextMenu.appendChild(removeButton);
        contextMenu.appendChild(styleForm);
        // contextMenu.appendChild(addChildButton);
        document.body.appendChild(contextMenu);

        // Set initial position
        const posX = event.clientX;
        const posY = event.clientY;

        contextMenu.style.position = 'absolute';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;

        // Hide context menu when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            if (!contextMenu.contains(e.target as Node)) {
                contextMenu.remove();
                document.removeEventListener('click', handleClickOutside);
                currentContextMenu = null;
            }
        };

        document.addEventListener('click', handleClickOutside);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (currentContextMenu && !currentContextMenu.contains(event.target as Node)) {
                currentContextMenu.remove();
                currentContextMenu = null;
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const htmlString = `
            <button 
                class="${buttonId}" 
                type="${buttonData.type}"
                ${buttonData.disabled ? 'disabled' : ''}
                ${buttonData.name ? `name="${buttonData.name}"` : ''}
                ${buttonData.value ? `value="${buttonData.value}"` : ''}
            >
                ${buttonData.text}
                
            return '';
        }).join('')}
            </button>
        `;
        const cssString = `
            .${buttonId} {
                ${Object.entries(baseStyles).map(([key, value]) => `${key}: ${value};`).join('\n                ')}
            }
        `;
        onUpdate(buttonId, htmlString, cssString);
    }, [buttonData, baseStyles, onUpdate, buttonId]);

    return (
        <button
            className={buttonId}
            id={buttonId}
            style={combinedStyles}
            type={buttonData.type as "button" | "submit" | "reset"}
            disabled={buttonData.disabled}
            name={buttonData.name}
            value={buttonData.value}
            onContextMenu={openContextMenu}
        >
            {buttonData.text}
        </button>
    );
};

export default ButtonComponent;