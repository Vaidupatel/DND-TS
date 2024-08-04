import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';
import { removeTableChild } from '../../store/slices/tableChildSlice';
import { removeNavChild } from '../../store/slices/navChildSlice';
import { removeAsideChild } from '../../store/slices/asideChildSlice';
import { removeArticleChild } from '../../store/slices/articleChildSlice';
import { removeMainChild } from '../../store/slices/mainChildSlice';
import { removeFooterChild } from '../../store/slices/footerChildSlice';
import { removeHeaderChild } from '../../store/slices/headerChildSlice';
import { removeSectionChild } from '../../store/slices/sectionChildSlice';
import { removeSpanChild } from '../../store/slices/spanChildSlice';
import { removeDivChild } from '../../store/slices/divChildListSlice';

interface SelectComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
}

let currentContextMenu: HTMLDivElement | null = null;

const SelectComponent: React.FC<SelectComponentProps> = ({
    childIndex,
    parentID,
    onUpdate,
    onRemove,
}) => {
    const droppableSelectid = `droppableSelect-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setSelectNodeRef } = useDroppable({
        id: droppableSelectid,
    });

    const dispatch = useDispatch();
    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});
    const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2', 'Option 3']);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const combinedStyles = {
        width: "200px",
        padding: "5px",
        border: '1px solid #ccc',
        backgroundColor: isOver ? '#C5CCD4' : baseStyles.backgroundColor,
        ...baseStyles,
    };

    const styleOptions = useMemo(() => [
        { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
        { label: 'Height', type: 'text', name: 'height', value: baseStyles.height ? String(baseStyles.height) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
        { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
    ], [baseStyles]);

    useEffect(() => {
        const optionsHtml = options.map(option => `<option>${option}</option>`).join('\n    ');
        const htmlString = `<select class="${droppableSelectid}">\n    ${optionsHtml}\n</select>`;
        const cssString = `
.${droppableSelectid} {
    ${styleOptions
                .filter(option => baseStyles[option.name as keyof React.CSSProperties])
                .map(option => `${option.name.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${baseStyles[option.name as keyof React.CSSProperties]};`)
                .join('\n    ')}
}
        `.trim();

        onUpdate(droppableSelectid, htmlString, cssString);
    }, [baseStyles, options, droppableSelectid, onUpdate, styleOptions]);

    const openContextMenu = (event: React.MouseEvent<HTMLSelectElement>) => {
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
            } else if (parentID.startsWith('droppableForm-')) {
                dispatch(removeFormChild({ FormId: parentID, componentIndex: childIndex }));
            } else if (parentID.startsWith('droppableTable-')) {
                dispatch(removeTableChild({ TableId: parentID, componentIndex: childIndex }));
            }
            contextMenu.remove();
            onRemove(droppableSelectid)
            currentContextMenu = null;
        });


        const styleForm = document.createElement('form');
        styleForm.className = 'style-form';

        const optionsInput = document.createElement('textarea');
        optionsInput.placeholder = 'Enter options (one per line)';
        optionsInput.className = 'inputField';
        optionsInput.value = options.join('\n');
        optionsInput.addEventListener('input', (e) => {
            setOptions((e.target as HTMLTextAreaElement).value.split('\n'));
        });

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
        contextMenu.appendChild(optionsInput);
        contextMenu.appendChild(searchInput);
        contextMenu.appendChild(styleForm);
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

    return (
        <select
            title='Select Component'
            className={droppableSelectid}
            ref={setSelectNodeRef}
            style={combinedStyles}
            onContextMenu={openContextMenu}
        >
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}
        </select>
    );
};

export default SelectComponent;