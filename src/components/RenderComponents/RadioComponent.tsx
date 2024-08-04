import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';

interface RadioComponentProps {
    childIndex: number;
    parentID: string;
    // draggedItemType: string | null;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
}

const RadioComponent: React.FC<RadioComponentProps> = ({ childIndex, parentID, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const [groupName, setGroupName] = useState<string>('');
    const [optionsText, setOptionsText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [contextMenu, setContextMenu] = useState<HTMLElement | null>(null);
    const [containerStyles, setContainerStyles] = useState<React.CSSProperties>({});
    const [labelStyles, setLabelStyles] = useState<React.CSSProperties>({});
    const [inputLabelStyle, setInputLabelStyle] = useState<React.CSSProperties>({});
    const [inputStyles, setInputStyles] = useState<React.CSSProperties>({});

    const radioId = `radio-${parentID}-${childIndex}`;

    const options = useMemo(() => optionsText.split('\n').filter(option => option.trim() !== ''), [optionsText]);

    useEffect(() => {
        const htmlString = `
            <fieldset id="${radioId}">
                <legend>${groupName}</legend>
                ${options.map((option, index) => `
                    <div>
                        <input type="radio" id="${radioId}-${index}" name="${groupName}" value="${option}" ${selectedOption === option ? 'checked' : ''} />
                        <label for="${radioId}-${index}">${option}</label>
                    </div>
                `).join('')}
            </fieldset>
        `;

        const generateCSSString = (styles: React.CSSProperties) => {
            return Object.entries(styles)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n  ');
        };

        const cssString = `
            #${radioId} {
                ${generateCSSString(containerStyles)}
            }
            #${radioId} legend {
                ${generateCSSString(labelStyles)}
            }
            #${radioId} input[type="radio"] {
                ${generateCSSString(inputStyles)}
            }
        `;

        onUpdate(radioId, htmlString, cssString);
    }, [groupName, options, selectedOption, containerStyles, labelStyles, inputStyles, radioId, onUpdate]);

    const styleOptions = useMemo(() => [
        { label: 'Container Width', type: 'text', name: 'width', value: containerStyles.width ? String(containerStyles.width) : '' },
        { label: 'Container Padding', type: 'text', name: 'padding', value: containerStyles.padding ? String(containerStyles.padding) : '' },
        { label: 'Container Border', type: 'text', name: 'border', value: containerStyles.border ? String(containerStyles.border) : '' },
        { label: 'Label Font Size', type: 'text', name: 'fontSize', value: labelStyles.fontSize ? String(labelStyles.fontSize) : '' },
        { label: 'Label Color', type: 'text', name: 'color', value: labelStyles.color ? String(labelStyles.color) : '' },
        { label: 'Input Margin', type: 'text', name: 'margin', value: inputStyles.margin ? String(inputStyles.margin) : '' },
        { label: 'Input Label Color', type: 'text', name: 'color', value: inputLabelStyle.color ? String(inputLabelStyle.color) : '' },
        { label: 'Input Label Font Size', type: 'text', name: 'fontSize', value: inputLabelStyle.fontSize ? String(inputLabelStyle.fontSize) : '' },
    ], [containerStyles.width, containerStyles.padding, containerStyles.border, labelStyles.fontSize, labelStyles.color, inputStyles.margin, inputLabelStyle.color, inputLabelStyle.fontSize]);

    const openContextMenu = (event: React.MouseEvent<HTMLFieldSetElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (contextMenu) {
            contextMenu.remove();
        }

        const ContextMenu = document.createElement('div');
        setContextMenu(ContextMenu);
        ContextMenu.className = 'contextMenu';
        ContextMenu.style.position = 'absolute';
        ContextMenu.style.top = `${event.clientY}px`;
        ContextMenu.style.left = `${event.clientX}px`;
        ContextMenu.style.cursor = 'move';

        const styleForm = document.createElement('form');
        styleForm.className = 'style-form';

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'button';
        removeButton.addEventListener('click', () => {
            if (parentID === 'droppable') {
                dispatch(removeComponentName(childIndex));
            } else if (parentID.startsWith('droppableForm-')) {
                dispatch(removeFormChild({ FormId: parentID, componentIndex: childIndex }));
            }
            ContextMenu.remove();
            onRemove(radioId);
            setContextMenu(null);
        });

        // Group Name
        const groupNameInput = document.createElement('input');
        groupNameInput.type = 'text';
        groupNameInput.placeholder = 'Enter group name...';
        groupNameInput.className = 'inputField';
        groupNameInput.value = groupName;
        groupNameInput.addEventListener('input', (e) => {
            setGroupName((e.target as HTMLInputElement)?.value || '');
        });

        // Options
        const optionsTextarea = document.createElement('textarea');
        optionsTextarea.placeholder = 'Enter options (one per line)...';
        optionsTextarea.className = 'inputField';
        optionsTextarea.value = optionsText;
        optionsTextarea.rows = 5;
        optionsTextarea.addEventListener('input', (e) => {
            setOptionsText((e.target as HTMLTextAreaElement)?.value || '');
        });

        const createInputField = (
            labelText: string,
            type: string,
            name: string,
            value: string,
            setter: React.Dispatch<React.SetStateAction<React.CSSProperties>>
        ) => {
            const StyleContainer = document.createElement('div');
            const label = document.createElement('label');
            label.textContent = labelText;
            const input = document.createElement('input');
            input.className = 'inputField';
            input.type = type;
            input.value = value;
            input.addEventListener('input', (e) => {
                const newValue = (e.target as HTMLInputElement)?.value;
                setter(prevStyles => ({
                    ...prevStyles,
                    [name]: newValue,
                }));
            });

            StyleContainer.appendChild(label);
            StyleContainer.appendChild(input);
            styleForm.appendChild(StyleContainer);
        };

        styleOptions.forEach(option => {
            const setter = (() => {
                if (option.label.startsWith('Container')) {
                    return setContainerStyles;
                } else if (option.label.startsWith('Label')) {
                    return setLabelStyles;
                } else if (option.label.startsWith('Input Label')) {
                    return setInputLabelStyle;
                } else {
                    return setInputStyles;
                }
            })();

            createInputField(option.label, option.type, option.name, option.value, setter);
        });
        ContextMenu.appendChild(removeButton);
        ContextMenu.appendChild(groupNameInput);
        ContextMenu.appendChild(optionsTextarea);
        ContextMenu.appendChild(styleForm);
        document.body.appendChild(ContextMenu);

        // Make context menu draggable
        let isDragging = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;

        ContextMenu.addEventListener('mousedown', (e: MouseEvent) => {
            isDragging = true;
            dragOffsetX = e.clientX - ContextMenu.offsetLeft;
            dragOffsetY = e.clientY - ContextMenu.offsetTop;
        });

        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (isDragging) {
                ContextMenu.style.left = `${e.clientX - dragOffsetX}px`;
                ContextMenu.style.top = `${e.clientY - dragOffsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        const handleClickOutside = (e: MouseEvent) => {
            if (!ContextMenu.contains(e.target as Node)) {
                ContextMenu.remove();
                setContextMenu(null);
                document.removeEventListener('click', handleClickOutside);
            }
        };

        document.addEventListener('click', handleClickOutside);
    };

    return (
        <fieldset id={radioId} style={containerStyles} onContextMenu={openContextMenu}>
            <legend style={labelStyles}>{groupName || "Radio Group"}</legend>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`${radioId}-${index}`}
                        name={groupName}
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                        style={inputStyles}
                    />
                    <label style={inputLabelStyle} htmlFor={`${radioId}-${index}`}>{option}</label>
                </div>
            ))}
        </fieldset>
    );
};

export default RadioComponent;