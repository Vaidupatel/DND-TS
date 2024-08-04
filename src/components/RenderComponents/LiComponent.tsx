import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
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
import DivComponent from './DivComponent';
import SpanComponent from './SpanComponent ';
import SectionComponent from './SectionComponent ';
import HeaderComponent from './HeaderComponent ';
import FooterComponent from './FooterComponent ';
import MainComponent from './MainComponent ';
import AsideComponent from './AsideComponent ';
import NavComponent from './NavComponent ';
import OlComponent from './OlComponent ';
import ArticleComponent from './ArticleComponent';
import DlComponent from './DlComponent ';
import FormComponent from './FormComponent ';
import TableComponent from './TableComponent ';
import IFrameComponent from './IFrameComponent ';
import FigureComponent from './FigureComponent ';
import UlComponent from './UlComponent ';
import AudioComponent from './AudioComponent';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';
import ParagraphComponent from './ParagraphComponent';

interface LiComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    depth: number;
    maxDepth?: number;
    draggedItemType: string | null;

}
let currentContextMenu: HTMLDivElement | null = null;

const LiComponent: React.FC<LiComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove, draggedItemType }) => {
    const droppableLiid = `droppableLi-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setLiNodeRef } = useDroppable({
        id: droppableLiid,
    });

    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

    const dispatch = useDispatch();
    const [liTextValue, setLiTextValue] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const combinedStyles = {
        height: "auto",
        width: "5rem",
        border: '1px dashed red',
        backgroundColor: isOver ? '#C5CCD4' : baseStyles.backgroundColor,
        ...baseStyles,
    };

    const styleOptions = useMemo(() => [
        { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
        { label: 'Height', type: 'text', name: 'height', value: baseStyles.height ? String(baseStyles.height) : '' },
        { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
        { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
        { label: 'font Weight', type: 'text', name: 'fontWeight', value: baseStyles.fontWeight ? String(baseStyles.fontWeight) : '' },
        { label: 'font Style', type: 'text', name: 'fontStyle', value: baseStyles.fontStyle ? String(baseStyles.fontStyle) : '' },
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
        { label: 'list Style Type', type: 'text', name: 'listStyleType', value: baseStyles.listStyleType ? String(baseStyles.listStyleType) : '' },
        { label: 'list Style Position', type: 'text', name: 'listStylePosition', value: baseStyles.listStylePosition ? String(baseStyles.listStylePosition) : '' },
        { label: 'line Height', type: 'text', name: 'lineHeight', value: baseStyles.lineHeight ? String(baseStyles.lineHeight) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
        { label: 'Text Align', type: 'text', name: 'textAlign', value: baseStyles.textAlign ? String(baseStyles.textAlign) : '' },
        { label: 'Text Decoration', type: 'text', name: 'textDecoration', value: baseStyles.textDecoration ? String(baseStyles.textDecoration) : '' },
        { label: 'Display', type: 'text', name: 'display', value: baseStyles.display ? String(baseStyles.display) : '' },
        { label: 'Position', type: 'text', name: 'position', value: baseStyles.position ? String(baseStyles.position) : '' },
    ], [baseStyles]);

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

        const htmlString = `<li class="${droppableLiid}">\n ${liTextValue} ${mergedChildrenHTML}\n</li>`;
        const cssString = `
.${droppableLiid} {
    ${styleOptions
                .filter(option => baseStyles[option.name as keyof React.CSSProperties])
                .map(option => `${option.name.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${baseStyles[option.name as keyof React.CSSProperties]};`)
                .join('\n    ')}
}
${mergedChildrenCSS}
        `.trim();

        onUpdate(droppableLiid, htmlString, cssString);
    }, [baseStyles, childrenData, droppableLiid, liTextValue, onUpdate, styleOptions]);

    const openContextMenu = (event: React.MouseEvent<HTMLLIElement>) => {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();

            if (currentContextMenu) {
                currentContextMenu.remove();
            }

            const contextMenu = document.createElement('div');
            currentContextMenu = contextMenu;
            contextMenu.className = 'contextMenu';

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
                onRemove(droppableLiid)
                currentContextMenu = null;
            });

            const styleForm = document.createElement('form');
            styleForm.className = 'style-form';

            const liText = document.createElement('input');
            liText.type = 'text';
            liText.placeholder = 'Enter the Text for list';
            liText.className = 'inputField';
            liText.value = liTextValue;
            liText.addEventListener('input', (e) => {
                setLiTextValue((e.target as HTMLInputElement).value);
            });

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
                    setBaseStyles((prevStyles) => ({
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
            contextMenu.appendChild(liText);
            contextMenu.appendChild(searchInput);
            contextMenu.appendChild(styleForm);
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
                            setBaseStyles((prevStyles) => ({
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


    const selectLiChildren = createSelector(
        [(state: RootState) => state.liChild, (_, droppableLiid: string) => droppableLiid],
        (liChild, droppableLiid) => liChild[droppableLiid] || []
    );
    const liChildren = useSelector((state: RootState) => selectLiChildren(state, droppableLiid));



    const renderComponent = (name: string, index: number) => {
        if (depth >= maxDepth) {
            return (
                <div key={`${droppableLiid}-${index}`} style={{ padding: '10px', border: '1px dashed red' }}>
                    Max nesting depth reached
                </div>
            );
        }
        switch (name) {
            case 'div':
                return (
                    <DivComponent
                        key={`${droppableLiid}-${index}`}
                        childIndex={index}
                        parentID={droppableLiid}
                        depth={depth + 1}
                        onUpdate={handleChildUpdate}
                        onRemove={handleChildRemove}
                    />
                );
            case 'span':
                return <SpanComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'section':
                return <SectionComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    maxDepth={maxDepth} />;
            case 'header':
                return <HeaderComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'footer':
                return <FooterComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'video':
                return <VideoComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'img':
                return <ImageComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'audio':
                return <AudioComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'main':
                return <MainComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'article':
                return <ArticleComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'aside':
                return <AsideComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'nav':
                return <NavComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'paragraph':
                return <ParagraphComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'ul':
                return <UlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    draggedItemType={draggedItemType} />;
            case 'ol':
                return <OlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'dl':
                return <DlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;

            case 'form':
                return <FormComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'table':
                return <TableComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'iframe':
                return <IFrameComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'figure':
                return <FigureComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableLiid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            // Add cases for other components
            default:
                return null; // Handle default case if necessary
        }
    };
    return (
        <li
            title='List Iteam'
            className={droppableLiid}
            ref={setLiNodeRef}
            style={combinedStyles}
            onContextMenu={openContextMenu}
        >
            {liTextValue}
            {liChildren.map((name: string, index: number) => renderComponent(name, index))}
        </li>
    );
};

export default LiComponent;
