import React, { useState, useEffect, useMemo } from 'react';
import './ContextMenu.css';
import { useDispatch } from 'react-redux';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';

interface InputComponentProps {
    childIndex: number;
    parentID: string;
    draggedItemType: string | null;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ childIndex, parentID, draggedItemType, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const [inputLabel, setInputLabel] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');
    const [inputPlaceHolder, setInputPlaceHolder] = useState<string>('');
    const [inputType, setInputType] = useState<string>('text');
    const [contextMenu, setContextMenu] = useState<HTMLElement | null>(null);
    const [containerStyles, setContainerStyles] = useState<React.CSSProperties>({});
    const [labelStyles, setLabelStyles] = useState<React.CSSProperties>({});
    const [inputStyles, setInputStyles] = useState<React.CSSProperties>({});
    const [inputAttributes, setInputAttributes] = useState<Record<string, string>>({});


    useEffect(() => {
        if (draggedItemType) {
            setInputType(draggedItemType);
        }
    }, []);

    useEffect(() => {
        const inputId = `input-${parentID}-${childIndex}`;
        const labelId = `label-${parentID}-${childIndex}`;
        const containerId = `container-${parentID}-${childIndex}`;

        const attributesString = Object.entries(inputAttributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');

        const htmlString = `
            <fieldset id="${containerId}">
                <label id="${labelId}" for="${inputId}">${inputLabel || "Default"}</label>
                <input id="${inputId}" type="${inputType}" placeholder="${inputPlaceHolder}" ${attributesString} />
            </fieldset>
        `;

        const generateCSSString = (styles: React.CSSProperties) => {
            return Object.entries(styles)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n  ');
        };

        const cssString = `
            #${containerId} {
                ${generateCSSString(containerStyles)}
            }
            #${labelId} {
                ${generateCSSString(labelStyles)}
            }
            #${inputId} {
                ${generateCSSString(inputStyles)}
            }
        `;

        onUpdate(inputId, htmlString, cssString);
    }, [inputLabel, inputPlaceHolder, inputType, containerStyles, labelStyles, inputStyles, inputAttributes, parentID, childIndex, onUpdate]);

    const styleContainerOptions = useMemo(() => [
        { label: 'Container height', type: 'text', name: 'height', value: containerStyles.height ? String(containerStyles.height) : '' },
        { label: 'Container width', type: 'text', name: 'width', value: containerStyles.width ? String(containerStyles.width) : '' },
        { label: 'Container Display', type: 'text', name: 'display', value: containerStyles.display ? String(containerStyles.display) : '' },
        { label: 'Container Flex Direction', type: 'text', name: 'flexDirection', value: containerStyles.flexDirection ? String(containerStyles.flexDirection) : '' },
        { label: 'Container Align Items', type: 'text', name: 'alignItems', value: containerStyles.alignItems ? String(containerStyles.alignItems) : '' },
        { label: 'Container Justify Content', type: 'text', name: 'justifyContent', value: containerStyles.justifyContent ? String(containerStyles.justifyContent) : '' },
        { label: 'Container Gap', type: 'text', name: 'gap', value: containerStyles.gap ? String(containerStyles.gap) : '' },
        { label: 'Container Padding', type: 'text', name: 'padding', value: containerStyles.padding ? String(containerStyles.padding) : '' },
        { label: 'Container Margin', type: 'text', name: 'margin', value: containerStyles.margin ? String(containerStyles.margin) : '' },
    ], [containerStyles]);

    const styleLabelOptions = useMemo(() => [
        { label: 'Label Color', type: 'text', name: 'color', value: labelStyles.color ? String(labelStyles.color) : '' },
        { label: 'Label Font Size', type: 'text', name: 'fontSize', value: labelStyles.fontSize ? String(labelStyles.fontSize) : '' },
        { label: 'Label Font Weight', type: 'text', name: 'fontWeight', value: labelStyles.fontWeight ? String(labelStyles.fontWeight) : '' },
        { label: 'Label Font Style', type: 'text', name: 'fontStyle', value: labelStyles.fontStyle ? String(labelStyles.fontStyle) : '' },
        { label: 'Label Text Transform', type: 'text', name: 'textTransform', value: labelStyles.textTransform ? String(labelStyles.textTransform) : '' },
        { label: 'Label Margin', type: 'text', name: 'margin', value: labelStyles.margin ? String(labelStyles.margin) : '' },
        { label: 'Label Padding', type: 'text', name: 'padding', value: labelStyles.padding ? String(labelStyles.padding) : '' },
        { label: 'Label Line Height', type: 'text', name: 'lineHeight', value: labelStyles.lineHeight ? String(labelStyles.lineHeight) : '' },
        { label: 'Label Border', type: 'text', name: 'border', value: labelStyles.border ? String(labelStyles.border) : '' },
        { label: 'Label Border Radius', type: 'text', name: 'borderRadius', value: labelStyles.borderRadius ? String(labelStyles.borderRadius) : '' },
        { label: 'Label Background Color', type: 'text', name: 'backgroundColor', value: labelStyles.backgroundColor ? String(labelStyles.backgroundColor) : '' },
    ], [labelStyles]);

    const styleInputOptions = useMemo(() => [
        { label: 'Input Width', type: 'text', name: 'width', value: inputStyles.width ? String(inputStyles.width) : '' },
        { label: 'Input Height', type: 'text', name: 'height', value: inputStyles.height ? String(inputStyles.height) : '' },
        { label: 'Input Padding', type: 'text', name: 'padding', value: inputStyles.padding ? String(inputStyles.padding) : '' },
        { label: 'Input Border', type: 'text', name: 'border', value: inputStyles.border ? String(inputStyles.border) : '' },
        { label: 'Input Border Radius', type: 'text', name: 'borderRadius', value: inputStyles.borderRadius ? String(inputStyles.borderRadius) : '' },
        { label: 'Input Box Shadow', type: 'text', name: 'boxShadow', value: inputStyles.boxShadow ? String(inputStyles.boxShadow) : '' },
        { label: 'Input Text Align', type: 'text', name: 'textAlign', value: inputStyles.textAlign ? String(inputStyles.textAlign) : '' },
        { label: 'Input Background Color', type: 'text', name: 'backgroundColor', value: inputStyles.backgroundColor ? String(inputStyles.backgroundColor) : '' },
        { label: 'Input Cursor', type: 'text', name: 'cursor', value: inputStyles.cursor ? String(inputStyles.cursor) : '' },
        { label: 'Input Color', type: 'text', name: 'color', value: inputStyles.color ? String(inputStyles.color) : '' },
        { label: 'Input Font Size', type: 'text', name: 'fontSize', value: inputStyles.fontSize ? String(inputStyles.fontSize) : '' },
    ], [inputStyles]);

    const inputTypeOptions = [
        'text', 'number', 'email', 'password', 'color', 'date', 'time', 'datetime-local',
        'month', 'week', 'hidden', 'url', 'tel', 'search', 'range', 'file'
    ];

    const getTypeSpecificAttributes = (type: string) => {
        switch (type) {
            case 'number':
            case 'range':
                return ['min', 'max', 'step'];
            case 'date':
            case 'time':
            case 'datetime-local':
            case 'month':
            case 'week':
                return ['min', 'max'];
            case 'file':
                return ['accept', 'multiple'];
            case 'email':
            case 'url':
            case 'tel':
                return ['pattern'];
            default:
                return [];
        }
    };

    const removeComponent = () => {
        onRemove(`input-${parentID}-${childIndex}`);
    };

    const openContextMenu = (event: React.MouseEvent<HTMLFieldSetElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (contextMenu) {
            contextMenu.remove();
        }

        const ContextMenu = document.createElement('div');
        setContextMenu(ContextMenu);
        ContextMenu.className = 'contextMenu';
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
            removeComponent();
            setContextMenu(null);
        });

        // Label
        const LabelInput = document.createElement('input');
        LabelInput.type = 'text';
        LabelInput.placeholder = 'Enter the label for input ...';
        LabelInput.className = 'inputField';
        LabelInput.value = inputLabel;
        LabelInput.addEventListener('input', (e) => {
            setInputLabel((e.target as HTMLInputElement)?.value || '');
        });

        // ID
        const IdInput = document.createElement('input');
        IdInput.type = 'text';
        IdInput.placeholder = 'Enter the id for input ...';
        IdInput.className = 'inputField';
        IdInput.value = inputId;
        IdInput.addEventListener('input', (e) => {
            setInputId((e.target as HTMLInputElement)?.value.toLowerCase() || '');
        });

        const TypeInput = document.createElement('select');
        TypeInput.className = 'inputField';
        TypeInput.title = "Select Input Type";

        inputTypeOptions.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type.charAt(0).toUpperCase() + type.slice(1);
            if (type === inputType) {
                option.selected = true;
            }
            TypeInput.appendChild(option);
        });

        TypeInput.addEventListener('change', (e) => {
            const selectedType = (e.target as HTMLSelectElement)?.value || 'text';
            setInputType(selectedType);
            updateTypeSpecificAttributes(selectedType);
        });

        // Placeholder
        const PlaceHolderInput = document.createElement('input');
        PlaceHolderInput.type = 'text';
        PlaceHolderInput.placeholder = 'Enter the placeholder for input ...';
        PlaceHolderInput.className = 'inputField';
        PlaceHolderInput.value = inputPlaceHolder;
        PlaceHolderInput.addEventListener('input', (e) => {
            setInputPlaceHolder((e.target as HTMLInputElement)?.value || '');
        });

        ContextMenu.appendChild(removeButton);

        const fieldContainer = document.createElement('div');
        fieldContainer.appendChild(IdInput);
        fieldContainer.appendChild(PlaceHolderInput);
        fieldContainer.appendChild(LabelInput);
        fieldContainer.appendChild(TypeInput);

        const spliter = document.createElement('div');
        spliter.style.width = '100%';
        spliter.style.height = '2px';
        spliter.style.margin = '8px';
        spliter.style.backgroundColor = '#999';

        ContextMenu.appendChild(fieldContainer);
        ContextMenu.appendChild(spliter);

        const createInputField = (
            labelText: string,
            type: string,
            name: string,
            value: string,
            setter: React.Dispatch<React.SetStateAction<React.CSSProperties>>
        ) => {
            const StyleContainer = document.createElement('div');
            const input = document.createElement('input');
            input.className = 'inputField';
            input.placeholder = labelText;
            input.type = type;
            input.value = value;
            input.addEventListener('input', (e) => {
                const newValue = (e.target as HTMLInputElement)?.value;
                setter(prevStyles => ({
                    ...prevStyles,
                    [name]: newValue,
                }));
            });

            StyleContainer.appendChild(input);
            styleForm.appendChild(StyleContainer);
        };

        styleContainerOptions.forEach(option => createInputField(option.label, option.type, option.name, option.value, setContainerStyles));
        styleLabelOptions.forEach(option => createInputField(option.label, option.type, option.name, option.value, setLabelStyles));
        styleInputOptions.forEach(option => createInputField(option.label, option.type, option.name, option.value, setInputStyles));

        const createAttributeField = (attribute: string) => {
            const container = document.createElement('div');
            const input = document.createElement('input');
            input.className = 'inputField attribute-field';
            input.placeholder = `Enter ${attribute}`;
            input.type = 'text';
            input.value = inputAttributes[attribute] || '';
            input.addEventListener('input', (e) => {
                const newValue = (e.target as HTMLInputElement)?.value;
                setInputAttributes(prevAttrs => ({
                    ...prevAttrs,
                    [attribute]: newValue,
                }));
            });

            container.appendChild(input);
            styleForm.appendChild(container);
        };

        const updateTypeSpecificAttributes = (type: string) => {
            const attributeFields = styleForm.querySelectorAll('.attribute-field');
            attributeFields.forEach(field => field.remove());

            getTypeSpecificAttributes(type).forEach(createAttributeField);
        };

        updateTypeSpecificAttributes(inputType);

        ContextMenu.appendChild(styleForm);
        document.body.appendChild(ContextMenu);

        const posX = event.clientX;
        const posY = event.clientY;

        ContextMenu.style.position = 'absolute';
        ContextMenu.style.top = `${posY}px`;
        ContextMenu.style.left = `${posX}px`;

        // Make context menu draggable
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            offsetX = e.clientX - ContextMenu.offsetLeft;
            offsetY = e.clientY - ContextMenu.offsetTop;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newPosX = e.clientX - offsetX;
                const newPosY = e.clientY - offsetY;
                ContextMenu.style.left = `${newPosX}px`;
                ContextMenu.style.top = `${newPosY}px`;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        ContextMenu.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        const handleClickOutside = (e: MouseEvent) => {
            if (!ContextMenu.contains(e.target as Node)) {
                ContextMenu.remove();
                setContextMenu(null);
                document.removeEventListener('click', handleClickOutside);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };

        document.addEventListener('click', handleClickOutside);
    };

    return (
        <fieldset style={containerStyles} onContextMenu={openContextMenu}>
            <label style={labelStyles} htmlFor={inputId}>{inputLabel || "Default"}</label>
            <input
                style={inputStyles}
                type={inputType}
                id={inputId}
                placeholder={inputPlaceHolder}
                {...inputAttributes}
            />
        </fieldset>
    );
};

export default InputComponent;