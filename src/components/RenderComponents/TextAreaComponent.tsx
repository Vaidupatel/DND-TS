import React, { useState, useEffect, useMemo } from 'react';
import './ContextMenu.css';
import { useDispatch } from 'react-redux';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';

interface TexeAreaComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    draggedItemType: string | null;
}

const TexeAreaComponent: React.FC<TexeAreaComponentProps> = ({ childIndex, parentID, draggedItemType, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const [textAreaLabel, setTextAreaLabel] = useState<string>('');
    const [textAreaId, setTextAreaId] = useState<string>('');
    const [textAreaPlaceholder, setTextAreaPlaceholder] = useState<string>('');
    const [labelStyles, setLabelStyles] = useState<React.CSSProperties>({});
    const [textAreaStyles, setTextAreaStyles] = useState<React.CSSProperties>({});
    const [containerStyles, setContainerStyles] = useState<React.CSSProperties>({});


    useEffect(() => {
        const textAreaId = `textarea-${parentID}-${childIndex}`;
        const labelId = `label-${parentID}-${childIndex}`;
        const containerId = `container-${parentID}-${childIndex}`;

        const htmlString = `
            <fieldset id="${containerId}">
                <label id="${labelId}" for="${textAreaId}">${textAreaLabel || "Default"}</label>
                <textarea id="${textAreaId}" placeholder="${textAreaPlaceholder}"></textarea>
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
            #${textAreaId} {
                ${generateCSSString(textAreaStyles)}
            }
        `;

        onUpdate(textAreaId, htmlString, cssString);
    }, [textAreaLabel, textAreaPlaceholder, labelStyles, textAreaStyles, containerStyles, parentID, childIndex, onUpdate]);


    const styleContainerOptions = useMemo(() => [
        { label: 'Container Height', type: 'text', name: 'height', value: containerStyles.height ? String(containerStyles.height) : '' },
        { label: 'Container Width', type: 'text', name: 'width', value: containerStyles.width ? String(containerStyles.width) : '' },
        { label: 'Container Display', type: 'text', name: 'display', value: containerStyles.display ? String(containerStyles.display) : '' },
        { label: 'Container border', type: 'text', name: 'border', value: containerStyles.border ? String(containerStyles.border) : '' },
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
        { label: 'Label Width', type: 'text', name: 'width', value: labelStyles.width ? String(labelStyles.width) : '' },
    ], [labelStyles]);

    const styleTextAreaOptions = useMemo(() => [
        { label: 'TextArea Width', type: 'text', name: 'width', value: textAreaStyles.width ? String(textAreaStyles.width) : '' },
        { label: 'TextArea Height', type: 'text', name: 'height', value: textAreaStyles.height ? String(textAreaStyles.height) : '' },
        { label: 'TextArea Border', type: 'text', name: 'border', value: textAreaStyles.border ? String(textAreaStyles.border) : '' },
        { label: 'TextArea Border Radius', type: 'text', name: 'borderRadius', value: textAreaStyles.borderRadius ? String(textAreaStyles.borderRadius) : '' },
        { label: 'TextArea Margin', type: 'text', name: 'margin', value: textAreaStyles.margin ? String(textAreaStyles.margin) : '' },
        { label: 'TextArea Padding', type: 'text', name: 'padding', value: textAreaStyles.padding ? String(textAreaStyles.padding) : '' },
        { label: 'TextArea Box Shadow', type: 'text', name: 'boxShadow', value: textAreaStyles.boxShadow ? String(textAreaStyles.boxShadow) : '' },
        { label: 'TextArea Text Align', type: 'text', name: 'textAlign', value: textAreaStyles.textAlign ? String(textAreaStyles.textAlign) : '' },
        { label: 'TextArea Background Color', type: 'text', name: 'backgroundColor', value: textAreaStyles.backgroundColor ? String(textAreaStyles.backgroundColor) : '' },
        { label: 'TextArea Color', type: 'text', name: 'color', value: textAreaStyles.color ? String(textAreaStyles.color) : '' },
        { label: 'TextArea Font Size', type: 'text', name: 'fontSize', value: textAreaStyles.fontSize ? String(textAreaStyles.fontSize) : '' },
        { label: 'TextArea Resize', type: 'text', name: 'resize', value: textAreaStyles.resize ? String(textAreaStyles.resize) : '' },
    ], [textAreaStyles]);



    const removeComponent = () => {
        onRemove(`textarea-${parentID}-${childIndex}`);
    };

    let currentContextMenu: HTMLDivElement | null = null;

    const openContextMenu = (event: React.MouseEvent<HTMLFieldSetElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (currentContextMenu) {
            currentContextMenu.remove();
        }
        const ContextMenu = document.createElement('div');
        ContextMenu.className = 'contextMenu';
        ContextMenu.style.cursor = 'move';
        // Add draggable functionality
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            offsetX = e.clientX - ContextMenu.getBoundingClientRect().left;
            offsetY = e.clientY - ContextMenu.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                ContextMenu.style.left = `${e.clientX - offsetX}px`;
                ContextMenu.style.top = `${e.clientY - offsetY}px`;
            }
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        ContextMenu.addEventListener('mousedown', onMouseDown);

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
        });

        // Label
        const LabelInput = document.createElement('input');
        LabelInput.type = 'text';
        LabelInput.placeholder = 'Enter the label for textarea ...';
        LabelInput.className = 'inputField';
        LabelInput.value = textAreaLabel;
        LabelInput.addEventListener('input', (e) => {
            setTextAreaLabel((e.target as HTMLInputElement)?.value || '');
        });

        // ID
        const IdInput = document.createElement('input');
        IdInput.type = 'text';
        IdInput.placeholder = 'Enter the id for textarea ...';
        IdInput.className = 'inputField';
        IdInput.value = textAreaId;
        IdInput.addEventListener('input', (e) => {
            setTextAreaId((e.target as HTMLInputElement)?.value.toLowerCase() || '');
        });

        // Placeholder
        const PlaceholderInput = document.createElement('input');
        PlaceholderInput.type = 'text';
        PlaceholderInput.placeholder = 'Enter the placeholder for textarea ...';
        PlaceholderInput.className = 'inputField';
        PlaceholderInput.value = textAreaPlaceholder;
        PlaceholderInput.addEventListener('input', (e) => {
            setTextAreaPlaceholder((e.target as HTMLInputElement)?.value || '');
        });

        ContextMenu.appendChild(removeButton);

        const fieldContainer = document.createElement('div');
        fieldContainer.appendChild(IdInput);
        fieldContainer.appendChild(PlaceholderInput);
        fieldContainer.appendChild(LabelInput);

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
        styleTextAreaOptions.forEach(option => createInputField(option.label, option.type, option.name, option.value, setTextAreaStyles));

        ContextMenu.appendChild(styleForm);
        document.body.appendChild(ContextMenu);

        // Set initial position
        const posX = event.clientX;
        const posY = event.clientY;

        ContextMenu.style.position = 'absolute';
        ContextMenu.style.top = `${posY}px`;
        ContextMenu.style.left = `${posX}px`;

        // Hide context menu when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            if (!ContextMenu.contains(e.target as Node)) {
                ContextMenu.remove();
                document.removeEventListener('click', handleClickOutside);
                currentContextMenu = null;
            }
        };
        document.addEventListener('click', handleClickOutside);
    };

    return (
        <fieldset style={containerStyles} onContextMenu={openContextMenu}>
            <label style={labelStyles} htmlFor={textAreaId}>{textAreaLabel || "Default"}</label>
            <textarea style={textAreaStyles} id={textAreaId} placeholder={textAreaPlaceholder} />
        </fieldset>
    );
};

export default TexeAreaComponent;