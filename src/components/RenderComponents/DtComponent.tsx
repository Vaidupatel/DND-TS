import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { useDroppable } from '@dnd-kit/core';
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
import { removeDlChild } from '../../store/slices/dlChildSlice';
import AudioComponent from './AudioComponent';
import ParagraphComponent from './ParagraphComponent';

interface DtComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    depth: number;
    maxDepth?: number;
    draggedItemType: string | null;

}
let currentContextMenu: HTMLDivElement | null = null;

const DtComponent: React.FC<DtComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove, draggedItemType }) => {
    const droppableDtid = `droppableDt-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setDtNodeRef } = useDroppable({
        id: droppableDtid,
    });

    const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({});

    const dispatch = useDispatch();
    const [dtTextValue, setDtTextValue] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const combinedStyles = {
        height: "1rem",
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

        const htmlString = `<dt class="${droppableDtid}">\n ${dtTextValue} ${mergedChildrenHTML}\n</dt>`;
        const cssString = `
.${droppableDtid} {
    ${styleOptions
                .filter(option => baseStyles[option.name as keyof React.CSSProperties])
                .map(option => `${option.name.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${baseStyles[option.name as keyof React.CSSProperties]};`)
                .join('\n    ')}
}
${mergedChildrenCSS}
        `.trim();

        onUpdate(droppableDtid, htmlString, cssString);
    }, [baseStyles, childrenData, droppableDtid, dtTextValue, onUpdate, styleOptions]);

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
                if (parentID.startsWith('droppableDl-')) {
                    dispatch(removeDlChild({ DlId: parentID, componentIndex: childIndex }));
                }
                contextMenu.remove();
                onRemove(droppableDtid)
                currentContextMenu = null;
            });

            const styleForm = document.createElement('form');
            styleForm.className = 'style-form';


            const dtText = document.createElement('input');
            dtText.type = 'text';
            dtText.placeholder = 'Enter the Text for list';
            dtText.className = 'inputField';
            dtText.value = dtTextValue;
            dtText.addEventListener('input', (e) => {
                setDtTextValue((e.target as HTMLInputElement).value);
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
            contextMenu.appendChild(dtText);
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
                        onUpdate={handleChildUpdate}
                        onRemove={handleChildRemove}
                    />
                );
            case 'span':
                return <SpanComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    draggedItemType={draggedItemType} />;
            case 'section':
                return <SectionComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    maxDepth={maxDepth} />;
            case 'header':
                return <HeaderComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'footer':
                return <FooterComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'audio':
                return <AudioComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'main':
                return <MainComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'article':
                return <ArticleComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'aside':
                return <AsideComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'nav':
                return <NavComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'paragraph':
                return <ParagraphComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'ul':
                return <UlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    draggedItemType={draggedItemType}
                />;
            case 'ol':
                return <OlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    draggedItemType={draggedItemType}
                />;
            case 'dl':
                return <DlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                    draggedItemType={draggedItemType}
                />;

            case 'form':
                return <FormComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'table':
                return <TableComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'iframe':
                return <IFrameComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'figure':
                return <FigureComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableDtid}
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
        <dt
            title='Data List Iteam'
            className={droppableDtid}
            ref={setDtNodeRef}
            style={combinedStyles}
            onContextMenu={openContextMenu}
        >
            {dtTextValue}
            {dtChildren.map((name: string, index: number) => renderComponent(name, index))}
        </dt>
    );
};

export default DtComponent;
