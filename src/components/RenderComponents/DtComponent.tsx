import React, { useEffect, useMemo, useState } from 'react';
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
import FieldSetComponent from './FieldSetComponent ';
import FormComponent from './FormComponent ';
import TableComponent from './TableComponent ';
import IFrameComponent from './IFrameComponent ';
import FigureComponent from './FigureComponent ';
import UlComponent from './UlComponent ';

interface DtComponentProps {
    childIndex: number;
    parentID: string;
    depth: number;
    maxDepth?: number;
    draggedItemType: string | null;

}
let currentContextMenu: HTMLDivElement | null = null;

const DtComponent: React.FC<DtComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, draggedItemType }) => {
    const droppableDtid = `droppableDt-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setDtNodeRef } = useDroppable({
        id: droppableDtid,
    });

    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const combinedStyles = {
        height: "10vh",

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


    const selectDtChildren = createSelector(
        [(state: RootState) => state.dtChild, (_, droppableDtid: string) => droppableDtid],
        (dtChild, droppableDtid) => dtChild[droppableDtid] || []
    );
    const dtChildren = useSelector((state: RootState) => selectDtChildren(state, droppableDtid));



    const renderComponent = (name: string, index: number) => {
        if (depth >= maxDepth) {
            return (
                <div key={`${droppableDtid}-${index}`} style={{ padding: '10px', border: '1px dashed red' }}>
                    Max nesting depth reached
                </div>
            );
        }
        switch (name) {
            case 'div':
                return (
                    <DivComponent
                        key={`${droppableDtid}-${index}`}
                        childIndex={index}
                        parentID={droppableDtid}
                        depth={depth + 1}
                    />
                );
            case 'span':
                return <SpanComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} draggedItemType={draggedItemType} />;
            case 'section':
                return <SectionComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} maxDepth={maxDepth} />;
            case 'header':
                return <HeaderComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'footer':
                return <FooterComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'main':
                return <MainComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'article':
                return <ArticleComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'aside':
                return <AsideComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'nav':
                return <NavComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'ul':
                return <UlComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} draggedItemType={draggedItemType} />;
            case 'ol':
                return <OlComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} draggedItemType={draggedItemType} />;
            case 'dl':
                return <DlComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} draggedItemType={draggedItemType} />;
            case 'fieldset':
                return <FieldSetComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'form':
                return <FormComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'table':
                return <TableComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'iframe':
                return <IFrameComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            case 'figure':
                return <FigureComponent key={index} childIndex={index} parentID={droppableDtid} depth={depth + 1} />;
            // Add cases for other components
            default:
                return null; // Handle default case if necessary
        }
    };
    return (
        <li
            title='List Iteam'
            ref={setDtNodeRef}
            style={combinedStyles}
            onContextMenu={openContextMenu}
        >
            {dtChildren.map((name: string, index: number) => renderComponent(name, index))}
        </li>
    );
};

export default DtComponent;
