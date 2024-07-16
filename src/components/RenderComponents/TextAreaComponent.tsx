import React, { useState, useEffect, useMemo } from 'react';
import './ContextMenu.css';
import { useDispatch } from 'react-redux';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';

interface TexeAreaComponentProps {
    childIndex: number;
    parentID: string;
    draggedItemType: string | null;
}

const TexeAreaComponent: React.FC<TexeAreaComponentProps> = ({ childIndex, parentID, draggedItemType }) => {
    const dispatch = useDispatch();
    const [teaxtAreaLabel, setTeaxtAreaLabel] = useState<string>('');
    const [teaxtAreaId, setTeaxtAreaId] = useState<string>('');
    const [teaxtAreaPlaceHolder, setTeaxtAreaPlaceHolder] = useState<string>('');
    const [contextMenu, setContextMenu] = useState<HTMLElement | null>(null);
    const [labelStyles, setLabelStyles] = useState<React.CSSProperties>({});
    const [teaxtAreaStyles, setTeaxtAreaStyles] = useState<React.CSSProperties>({});


    const styleLabelOptions = useMemo(() => [
        { label: 'Label Color', type: 'text', name: 'color', value: labelStyles.color ? String(labelStyles.color) : '' },
        { label: 'Label Font Size', type: 'text', name: 'fontSize', value: labelStyles.fontSize ? String(labelStyles.fontSize) : '' },
        { label: 'Label Font Weight', type: 'text', name: 'fontWeight', value: labelStyles.fontWeight ? String(labelStyles.fontWeight) : '' },
        { label: 'Label Font Style', type: 'text', name: 'fontStyle', value: labelStyles.fontStyle ? String(labelStyles.fontStyle) : '' },

        { label: 'Label text-transform', type: 'text', name: 'textTransform', value: labelStyles.textTransform ? String(labelStyles.textTransform) : '' },
        { label: 'Label margin', type: 'text', name: 'margin', value: labelStyles.margin ? String(labelStyles.margin) : '' },
        { label: 'Label padding', type: 'text', name: 'padding', value: labelStyles.padding ? String(labelStyles.padding) : '' },
        { label: 'Label line-height', type: 'text', name: 'lineHeight', value: labelStyles.lineHeight ? String(labelStyles.lineHeight) : '' },
        { label: 'Label border', type: 'text', name: 'border', value: labelStyles.border ? String(labelStyles.border) : '' },
        { label: 'Label border-radius', type: 'text', name: 'borderRadius', value: labelStyles.borderRadius ? String(labelStyles.borderRadius) : '' },
        { label: 'Label background-color', type: 'text', name: 'backgroundColor', value: labelStyles.backgroundColor ? String(labelStyles.backgroundColor) : '' },
    ], [labelStyles]);

    const styleTextAreaOptions = useMemo(() => [
        { label: 'Input Width', type: 'text', name: 'width', value: teaxtAreaStyles.width ? String(teaxtAreaStyles.width) : '' },
        { label: 'Input margin', type: 'text', name: 'height', value: teaxtAreaStyles.height ? String(teaxtAreaStyles.height) : '' },
        { label: 'Input padding', type: 'text', name: 'padding', value: teaxtAreaStyles.padding ? String(teaxtAreaStyles.padding) : '' },
        { label: 'Input border', type: 'text', name: 'border', value: teaxtAreaStyles.border ? String(teaxtAreaStyles.border) : '' },
        { label: 'Input border-radius', type: 'text', name: 'borderRadius', value: teaxtAreaStyles.borderRadius ? String(teaxtAreaStyles.borderRadius) : '' },
        { label: 'Input box shadow', type: 'text', name: 'boxShadow', value: teaxtAreaStyles.boxShadow ? String(teaxtAreaStyles.boxShadow) : '' },
        { label: 'Input text-align', type: 'text', name: 'textAlign', value: teaxtAreaStyles.textAlign ? String(teaxtAreaStyles.textAlign) : '' },
        { label: 'Input background-color', type: 'text', name: 'backgroundColor', value: teaxtAreaStyles.backgroundColor ? String(teaxtAreaStyles.backgroundColor) : '' },
        { label: 'Input cursor', type: 'text', name: 'cursor', value: teaxtAreaStyles.cursor ? String(teaxtAreaStyles.cursor) : '' },
        { label: 'Input Color', type: 'text', name: 'color', value: teaxtAreaStyles.color ? String(teaxtAreaStyles.color) : '' },
        { label: 'Input Font Size', type: 'text', name: 'fontSize', value: teaxtAreaStyles.fontSize ? String(teaxtAreaStyles.fontSize) : '' },
    ], [teaxtAreaStyles]);

    const openContextMenu = (event: React.MouseEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (contextMenu) {
            contextMenu.remove();
        }

        const ContextMenu = document.createElement('div');
        setContextMenu(ContextMenu);
        ContextMenu.className = 'contextMenu';

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
            setContextMenu(null);
        });

        // Label
        const LabelInput = document.createElement('input');
        LabelInput.type = 'text';
        LabelInput.placeholder = 'Enter the label for input ...';
        LabelInput.className = 'inputField';
        LabelInput.value = teaxtAreaLabel;
        LabelInput.addEventListener('input', (e) => {
            setTeaxtAreaLabel((e.target as HTMLInputElement)?.value || ''); // Cast to HTMLInputElement
        });

        // ID
        const IdInput = document.createElement('input');
        IdInput.type = 'text';
        IdInput.placeholder = 'Enter the id for input ...';
        IdInput.className = 'inputField';
        IdInput.value = teaxtAreaId;
        IdInput.addEventListener('input', (e) => {
            setTeaxtAreaId((e.target as HTMLInputElement)?.value.toLowerCase() || ''); // Cast to HTMLInputElement
        });



        // Placeholder
        const PlaceHolderInput = document.createElement('input');
        PlaceHolderInput.type = 'text';
        PlaceHolderInput.placeholder = 'Enter the placeholder for input ...';
        PlaceHolderInput.className = 'inputField';
        PlaceHolderInput.value = teaxtAreaPlaceHolder;
        PlaceHolderInput.addEventListener('input', (e) => {
            setTeaxtAreaPlaceHolder((e.target as HTMLInputElement)?.value || '');
        });



        ContextMenu.appendChild(removeButton);
        // ContextMenu.appendChild(styleForm);

        const fieldContainer = document.createElement('div');
        fieldContainer.appendChild(IdInput);
        fieldContainer.appendChild(PlaceHolderInput);
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

        styleLabelOptions.forEach(option => createInputField(option.label, option.type, option.name, option.value, setLabelStyles));
        styleTextAreaOptions.forEach(option => createInputField(option.label, option.type, option.name, option.value, setTeaxtAreaStyles));


        ContextMenu.appendChild(styleForm)
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
        <textarea
            title='Text Area' onContextMenu={openContextMenu}>

        </textarea>
    );
};

export default TexeAreaComponent;
