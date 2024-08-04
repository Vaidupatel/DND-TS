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

interface AudioComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
}

let currentContextMenu: HTMLDivElement | null = null;

const AudioComponent: React.FC<AudioComponentProps> = ({ childIndex, parentID, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [audioData, setAudioData] = useState({
        src: 'https://example.com/audio.mp3',
        controls: true,
        autoplay: false,
        loop: false,
        muted: false,
        preload: 'auto'
    });
    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

    const audioId = `audio-${parentID}-${childIndex}`;

    const combinedStyles = {
        ...baseStyles,
    };

    const styleOptions = [
        { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
    ];

    const openContextMenu = (event: React.MouseEvent<HTMLAudioElement>) => {
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
            onRemove(audioId);
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
                if (['src', 'controls', 'autoplay', 'loop', 'muted', 'preload'].includes(name)) {
                    setAudioData((prevData) => ({
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

        // Add audio-specific fields
        createInputField('Audio URL', 'text', 'src', audioData.src);
        createInputField('Controls', 'checkbox', 'controls', audioData.controls);
        createInputField('Autoplay', 'checkbox', 'autoplay', audioData.autoplay);
        createInputField('Loop', 'checkbox', 'loop', audioData.loop);
        createInputField('Muted', 'checkbox', 'muted', audioData.muted);
        createInputField('Preload', 'text', 'preload', audioData.preload);

        styleOptions
            .filter(option => option.label.toLowerCase().includes(searchTerm))
            .forEach(option => {
                createInputField(option.label, option.type, option.name, option.value);
            });

        contextMenu.appendChild(removeButton);
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
        const audioElement = document.getElementById(audioId) as HTMLAudioElement;
        if (audioElement) {
            audioElement.src = audioData.src;
        }
    }, [audioData.src, audioId]);

    useEffect(() => {
        const htmlString = `
            <audio 
                class="${audioId}" 
                src="${audioData.src}"
                ${audioData.controls ? 'controls' : ''}
                ${audioData.autoplay ? 'autoplay' : ''}
                ${audioData.loop ? 'loop' : ''}
                ${audioData.muted ? 'muted' : ''}
                preload="${audioData.preload}"
            ></audio>
        `;
        const cssString = `
            .${audioId} {
                ${Object.entries(baseStyles).map(([key, value]) => `${key}: ${value};`).join('\n                ')}
            }
        `;
        onUpdate(audioId, htmlString, cssString);
    }, [audioData, baseStyles, onUpdate, audioId]);

    return (
        <audio
            className={audioId}
            id={audioId}
            style={combinedStyles}
            controls={audioData.controls}
            autoPlay={audioData.autoplay}
            loop={audioData.loop}
            muted={audioData.muted}
            preload={audioData.preload as 'auto' | 'metadata' | 'none'}
            onContextMenu={openContextMenu}
            src={audioData.src}
        />
    );
};

export default AudioComponent;