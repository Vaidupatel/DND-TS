import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
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
import { removeFieldSetChild } from '../../store/slices/fieldsetChildSlice';
import { removeFormChild } from '../../store/slices/formChildSlice';
import { removeTableChild } from '../../store/slices/tableChildSlice';
import { removeIFrameChild } from '../../store/slices/iFrameChildSlice';
import { removeFigureChild } from '../../store/slices/figureChildSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import DivComponent from './DivComponent';
import SpanComponent from './SpanComponent ';
import SectionComponent from './SectionComponent ';
import HeaderComponent from './HeaderComponent ';
import FooterComponent from './FooterComponent ';
import MainComponent from './MainComponent ';
import AsideComponent from './AsideComponent ';
import ArticleComponent from './ArticleComponent';
import UlComponent from './UlComponent ';
import OlComponent from './OlComponent ';
import DlComponent from './DlComponent ';
import FormComponent from './FormComponent ';
import TableComponent from './TableComponent ';
import IFrameComponent from './IFrameComponent ';
import FigureComponent from './FigureComponent ';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import ParagraphComponent from './ParagraphComponent';

interface NavComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    depth: number;
    maxDepth?: number;
}

const NavComponent: React.FC<NavComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove }) => {
    const dispatch = useDispatch();
    const droppableNavid = `droppableNav-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setNodeNav } = useDroppable({
        id: droppableNavid,
    });
    let currentContextMenu: HTMLHeadElement | null = null;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [baseStyles, setbaseStyles] = useState<React.CSSProperties>({});
    const styleOptions = useMemo(() => [
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Height', type: 'text', name: 'height', value: baseStyles.height ? String(baseStyles.height) : '' },
        { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
        { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
        { label: 'Padding Left', type: 'text', name: 'paddingLeft', value: baseStyles.paddingLeft ? String(baseStyles.paddingLeft) : '' },
        { label: 'Padding Top', type: 'text', name: 'paddingTop', value: baseStyles.paddingTop ? String(baseStyles.paddingTop) : '' },
        { label: 'Padding Right', type: 'text', name: 'paddingRight', value: baseStyles.paddingRight ? String(baseStyles.paddingRight) : '' },
        { label: 'Padding Bottom', type: 'text', name: 'paddingBottom', value: baseStyles.paddingBottom ? String(baseStyles.paddingBottom) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
        { label: 'Margin Left', type: 'text', name: 'marginLeft', value: baseStyles.marginLeft ? String(baseStyles.marginLeft) : '' },
        { label: 'Margin Top', type: 'text', name: 'marginTop', value: baseStyles.marginTop ? String(baseStyles.marginTop) : '' },
        { label: 'Margin Right', type: 'text', name: 'marginRight', value: baseStyles.marginRight ? String(baseStyles.marginRight) : '' },
        { label: 'Margin Bottom', type: 'text', name: 'marginBottom', value: baseStyles.marginBottom ? String(baseStyles.marginBottom) : '' },
        { label: 'Box Shadow', type: 'text', name: 'boxShadow', value: baseStyles.boxShadow ? String(baseStyles.boxShadow) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
        { label: 'Text Align', type: 'text', name: 'textAlign', value: baseStyles.textAlign ? String(baseStyles.textAlign) : '' },
        { label: 'Display', type: 'text', name: 'display', value: baseStyles.display ? String(baseStyles.display) : '' },
        { label: 'Flex Direction', type: 'text', name: 'flexDirection', value: baseStyles.flexDirection ? String(baseStyles.flexDirection) : '' },
        { label: 'Justify Content', type: 'text', name: 'justifyContent', value: baseStyles.justifyContent ? String(baseStyles.justifyContent) : '' },
        { label: 'Align Items', type: 'text', name: 'alignItems', value: baseStyles.alignItems ? String(baseStyles.alignItems) : '' },
        { label: 'Gap', type: 'text', name: 'gap', value: baseStyles.gap ? String(baseStyles.gap) : '' },
    ], [baseStyles]);


    const combinedNavStyles = {
        height: "10vh",
        border: '1px dashed red',
        backgroundColor: isOver ? '#C5CCD4' : baseStyles.backgroundColor,
        ...baseStyles,
    };


    const [childrenData, setChildrenData] = useState<Record<string, { html: string, css: string }>>({});

    const handleChildUpdate = useCallback((childId: string, html: string, css: string) => {
        setChildrenData(prevData => ({
            ...prevData,
            [childId]: { html, css }
        }));
    }, []);

    const handleChildRemove = useCallback((childId: string) => {
        setChildrenData(prevData => {
            const newData = { ...prevData };
            delete newData[childId];
            return newData;
        });
    }, []);

    useEffect(() => {
        let mergedChildrenHTML = '';
        let mergedChildrenCSS = '';
        Object.values(childrenData).forEach(data => {
            mergedChildrenHTML += data.html;
            mergedChildrenCSS += data.css;
        });

        const htmlString = `<nav class="${droppableNavid}">\n${mergedChildrenHTML}\n</nav>`;
        const cssString = `
      .${droppableNavid} {
          ${Object.entries(baseStyles)
                .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n  ')}
      }
      ${mergedChildrenCSS}
      `;

        onUpdate(droppableNavid, htmlString, cssString);
    }, [baseStyles, childrenData, droppableNavid, onUpdate]);



    const openContextMenu = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
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
                } else if (parentID.startsWith('droppableUl-')) {
                    dispatch(removeUlChild({ UlId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableOl-')) {
                    dispatch(removeOlChild({ OlId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableDl-')) {
                    dispatch(removeDlChild({ DlId: parentID, componentIndex: childIndex }));
                } else if (parentID.startsWith('droppableFieldSet-')) {
                    dispatch(removeFieldSetChild({ FieldSetId: parentID, componentIndex: childIndex }));
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
                onRemove(droppableNavid)
                currentContextMenu = null;
            });

            const styleForm = document.createElement('form');
            styleForm.className = 'style-form';

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
                    setbaseStyles((prevStyles) => ({
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
        }
    }

    useEffect(() => {
        if (currentContextMenu) {
            const styleForm = currentContextMenu.querySelector('.style-form');
            if (styleForm) {
                while (styleForm.firstChild) {
                    styleForm.removeChild(styleForm.firstChild);
                }
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Search styles...';
                searchInput.className = 'inputField';
                searchInput.value = searchTerm;
                searchInput.addEventListener('input', (e) => {
                    setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
                });
                styleOptions
                    .filter(option => option.label.toLowerCase().includes(searchTerm))
                    .forEach(option => {
                        const fieldContainer = document.createElement('div');

                        const label = document.createElement('label');
                        label.textContent = option.label;
                        label.htmlFor = option.name;

                        const input = document.createElement('input');
                        input.className = 'inputField';
                        input.type = option.type;
                        input.name = option.name;
                        input.value = option.value || '';

                        input.addEventListener('input', (e) => {
                            const target = e.target as HTMLInputElement;
                            const newValue = target.value;
                            setbaseStyles((prevStyles) => ({
                                ...prevStyles,
                                [option.name]: newValue
                            }));
                        });

                        fieldContainer.appendChild(label);
                        fieldContainer.appendChild(input);
                        styleForm.appendChild(fieldContainer);
                    });
            }
        }
    }, [searchTerm]);

    const selectnavChildren = createSelector(
        [(state: RootState) => state.navChild, (_, droppableNavid: string) => droppableNavid],
        (navChild, droppableNavid) => navChild[droppableNavid] || []
    );
    const navChildren = useSelector((state: RootState) => selectnavChildren(state, droppableNavid));
    const renderComponent = (name: string, index: number) => {
        if (depth >= maxDepth) {
            return (
                <div key={`${droppableNavid}`}>
                    Max nesting depth reached
                </div>
            )
        }
        switch (name) {
            case 'div':
                return <DivComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'span':
                return <SpanComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'section':
                return <SectionComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'header':
                return <HeaderComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'footer':
                return <FooterComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'main':
                return <MainComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'article':
                return <ArticleComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'img':
                return <ImageComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'video':
                return <VideoComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'audio':
                return <AudioComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'aside':
                return (<AsideComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />)
            case 'nav':
                return <NavComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />
            case 'paragraph':
                return <ParagraphComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableNavid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;

            case 'ul':
                return <UlComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'ol':
                return <OlComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'dl':
                return <DlComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;

            case 'form':
                return <FormComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'table':
                return <TableComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'iframe':
                return <IFrameComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'figure':
                return <FigureComponent
                    key={index}
                    childIndex={index}
                    depth={depth + 1}
                    parentID={droppableNavid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            // Add cases for other components
            default:
                return null; // Handle default case if necessary
        }
    };


    return (
        <nav
            title='Nav'
            ref={setNodeNav}
            // className={`nav-component-${childIndex}`}
            className={droppableNavid}
            style={combinedNavStyles}
            onContextMenu={openContextMenu}
        >

            {navChildren.map((name: string, index: number) => renderComponent(name, index))}

        </nav>
    );
};

export default NavComponent;
