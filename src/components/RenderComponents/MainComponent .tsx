import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeComponentName } from '../../store/componentNamesSlice';

interface MainComponentProps {
    index: number;
}

const MainComponent: React.FC<MainComponentProps> = ({ index }) => {
    const dispatch = useDispatch();
    const [styles, setStyles] = useState<React.CSSProperties>({ border: '2px solid' });

    const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'button';
        removeButton.addEventListener('click', () => {
            dispatch(removeComponentName(index));
            contextMenu.remove();
        });

        contextMenu.appendChild(removeButton);
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
            }
        };

        document.addEventListener('click', handleClickOutside);
    };

    return (
        <div
            className='main-component'
            style={styles}
            onContextMenu={openContextMenu}
        >
            MainComponent
        </div>
    );
};

export default MainComponent;
