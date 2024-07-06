

import React from 'react';
import './DropdownComponent.css'
import Draggable from './Draggable';
import { Components } from './types';

interface DropdownProps {
    components: Components;
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    dropdownRef: React.RefObject<HTMLDivElement>;

}

const Dropdown: React.FC<DropdownProps> = ({ components, label, isOpen, onToggle, dropdownRef }) => {
    return (
        <div className="dropdown" ref={dropdownRef} >
            <button className="dropdown-button" onClick={onToggle}>
                {label}
            </button>
            {isOpen && (
                <ul className="custom-dropdown">
                    {Object.entries(components).map(([key, component]) => (
                        <li key={key} className="dropdown-item">
                            <Draggable
                                id={parseInt(key)}
                                content={component}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;