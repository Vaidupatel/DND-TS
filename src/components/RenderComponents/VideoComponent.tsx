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

interface VideoComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
}


const VideoComponent: React.FC<VideoComponentProps> = ({ childIndex, parentID, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [videoData, setVideoData] = useState({
        src: 'https://via.placeholder.com/150',
        width: '150px',
        height: '150px',
        controls: true
    });
    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

    const videoId = `video-${parentID}-${childIndex}`;

    const combinedStyles = {
        ...baseStyles,
        width: videoData.width,
        height: videoData.height,
    };

    const styleOptions = [
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Box Shadow', type: 'text', name: 'boxShadow', value: baseStyles.boxShadow ? String(baseStyles.boxShadow) : '' },
        { label: 'Object Fit', type: 'text', name: 'objectFit', value: baseStyles.objectFit ? String(baseStyles.objectFit) : '' },
        { label: 'Object Position', type: 'text', name: 'objectPosition', value: baseStyles.objectPosition ? String(baseStyles.objectPosition) : '' },
    ];

    let currentContextMenu: HTMLDivElement | null = null;

    const openContextMenu = (event: React.MouseEvent<HTMLVideoElement>) => {
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
            onRemove(videoId);
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

        const createInputField = (labelText: string, inputType: string, name: string, value: string) => {
            const fieldContainer = document.createElement('div');

            const label = document.createElement('label');
            label.textContent = labelText;
            label.htmlFor = name;

            const input = document.createElement('input');
            input.className = 'inputField';
            input.type = inputType;
            input.name = name;
            input.value = value;

            input.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                const newValue = target.value;
                if (['src', 'width', 'height'].includes(name)) {
                    setVideoData((prevData) => ({
                        ...prevData,
                        [name]: newValue,
                    }));
                } else if (name === 'controls') {
                    setVideoData((prevData) => ({
                        ...prevData,
                        [name]: !prevData[name],
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

        // Add video-specific fields
        createInputField('Video URL', 'text', 'src', videoData.src);
        createInputField('Width', 'text', 'width', videoData.width);
        createInputField('Height', 'text', 'height', videoData.height);

        // Add control toggle
        const controlsFieldContainer = document.createElement('div');
        const controlsLabel = document.createElement('label');
        controlsLabel.textContent = 'Show Controls';
        controlsLabel.htmlFor = 'controls';
        const controlsCheckbox = document.createElement('input');
        controlsCheckbox.type = 'checkbox';
        controlsCheckbox.id = 'controls';
        controlsCheckbox.checked = videoData.controls;
        controlsCheckbox.addEventListener('change', (e) => {
            setVideoData((prevData) => ({
                ...prevData,
                controls: (e.target as HTMLInputElement).checked,
            }));
        });
        controlsFieldContainer.appendChild(controlsLabel);
        controlsFieldContainer.appendChild(controlsCheckbox);
        styleForm.appendChild(controlsFieldContainer);

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
        const videoElement = document.getElementById(videoId) as HTMLVideoElement;
        if (videoElement) {
            videoElement.src = videoData.src;
        }
    }, [videoData.src, videoId]);

    useEffect(() => {
        const htmlString = `
            <video class="${videoId}" src="${videoData.src}" width="${videoData.width}" height="${videoData.height}" ${videoData.controls ? 'controls' : ''}></video>
        `;
        const cssString = `
            .${videoId} {
                ${Object.entries(baseStyles).map(([key, value]) => `${key}: ${value};`).join(' ')}
            }
        `;
        onUpdate(videoId, htmlString, cssString);
    }, [videoData, baseStyles, onUpdate, videoId]);

    return (
        <video
            className={videoId}
            id={videoId}
            style={combinedStyles}
            controls={videoData.controls}
            onContextMenu={openContextMenu}

        />

    );
};

export default VideoComponent;
