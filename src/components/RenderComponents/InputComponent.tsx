import React, { useState, useEffect } from 'react';
import './ContextMenu.css';
import { useDispatch } from 'react-redux';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';

interface InputComponentProps {
    childIndex: number;
    parentID: string;
    draggedItemType: string | null;
}

const InputComponent: React.FC<InputComponentProps> = ({ childIndex, parentID, draggedItemType }) => {
    const dispatch = useDispatch();
    const [inputLabel, setInputLabel] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');
    const [inputPlaceHolder, setInputPlaceHolder] = useState<string>('');
    const [inputType, setInputType] = useState<string>('');
    const [contextMenu, setContextMenu] = useState<HTMLElement | null>(null);

    // Update inputType state when draggedItemType changes
    useEffect(() => {
        if (draggedItemType) {
            setInputType(draggedItemType);
        }
    }, [draggedItemType]);

    const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (contextMenu) {
            contextMenu.remove();
        }

        const newContextMenu = document.createElement('div');
        setContextMenu(newContextMenu);
        newContextMenu.className = 'contextMenu';

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
            newContextMenu.remove();
            setContextMenu(null);
        });

        // Label
        const LabelInput = document.createElement('input');
        LabelInput.type = 'text';
        LabelInput.placeholder = 'Enter the label for input ...';
        LabelInput.className = 'inputField';
        LabelInput.value = inputLabel;
        LabelInput.addEventListener('input', (e) => {
            setInputLabel((e.target as HTMLInputElement)?.value || ''); // Cast to HTMLInputElement
        });

        // ID
        const IdInput = document.createElement('input');
        IdInput.type = 'text';
        IdInput.placeholder = 'Enter the id for input ...';
        IdInput.className = 'inputField';
        IdInput.value = inputId;
        IdInput.addEventListener('input', (e) => {
            setInputId((e.target as HTMLInputElement)?.value.toLowerCase() || ''); // Cast to HTMLInputElement
        });

        // Type Select Dropdown
        const TypeInput = document.createElement('select');
        TypeInput.className = 'inputField';

        ['text', 'number', 'email', 'password'].forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
            if (type === inputType) {
                option.selected = true; // Set default selected option based on inputType state
            }
            TypeInput.appendChild(option);
        });

        TypeInput.addEventListener('change', (e) => {
            const selectedType = (e.target as HTMLSelectElement)?.value || 'text';
            setInputType(selectedType);
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

        newContextMenu.appendChild(removeButton);
        newContextMenu.appendChild(styleForm);

        const fieldContainer = document.createElement('div');
        fieldContainer.appendChild(IdInput);
        fieldContainer.appendChild(PlaceHolderInput);
        fieldContainer.appendChild(LabelInput);
        fieldContainer.appendChild(TypeInput);

        styleForm.appendChild(fieldContainer);

        document.body.appendChild(newContextMenu);

        const posX = event.clientX;
        const posY = event.clientY;

        newContextMenu.style.position = 'absolute';
        newContextMenu.style.top = `${posY}px`;
        newContextMenu.style.left = `${posX}px`;

        // Make context menu draggable
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            offsetX = e.clientX - newContextMenu.offsetLeft;
            offsetY = e.clientY - newContextMenu.offsetTop;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newPosX = e.clientX - offsetX;
                const newPosY = e.clientY - offsetY;
                newContextMenu.style.left = `${newPosX}px`;
                newContextMenu.style.top = `${newPosY}px`;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        newContextMenu.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        const handleClickOutside = (e: MouseEvent) => {
            if (!newContextMenu.contains(e.target as Node)) {
                newContextMenu.remove();
                setContextMenu(null);
                document.removeEventListener('click', handleClickOutside);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };

        document.addEventListener('click', handleClickOutside);
    };


    return (
        <div onContextMenu={openContextMenu}>
            <label >{inputLabel || "Default"}</label>
            <input type={inputType} id={inputId} placeholder={inputPlaceHolder} />
        </div>
    );
};

export default InputComponent;
