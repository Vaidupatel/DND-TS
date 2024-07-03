import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeComponentName } from '../../store/componentNamesSlice';
import { useDroppable } from '@dnd-kit/core';
import { removeDivChild } from '../../store/divChildListSlice';
import { RootState } from '../../store/store';
import { createSelector } from '@reduxjs/toolkit';
import SpanComponent from './SpanComponent ';
import DivComponent from './DivComponent';
import SectionComponent from './SectionComponent ';
import FooterComponent from './FooterComponent ';
import MainComponent from './MainComponent ';
import ArticleComponent from './ArticaleComponent ';
import AsideComponent from './AsideComponent ';
import NavComponent from './NavComponent ';


interface HeaderComponentProps {
    childIndex: number;
    parentID: string
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ childIndex, parentID }) => {
    const dispatch = useDispatch();
    const droppableHeaderid = `droppableHeader-${childIndex}`;
    const { isOver, setNodeRef: setNodeHeader } = useDroppable({
        id: droppableHeaderid
    });
    let currentContextMenu: HTMLHeadElement | null = null;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [baseSectionStyles, setbaseSectionStyles] = useState<React.CSSProperties>({
        border: '2px solid blue',
    });
    const styleOptions = useMemo(() => [
        { label: 'Border', type: 'text', name: 'border', value: baseSectionStyles.border ? String(baseSectionStyles.border) : '' },
        { label: 'Height', type: 'text', name: 'height', value: baseSectionStyles.height ? String(baseSectionStyles.height) : '' },
        { label: 'Width', type: 'text', name: 'width', value: baseSectionStyles.width ? String(baseSectionStyles.width) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseSectionStyles.backgroundColor ? String(baseSectionStyles.backgroundColor) : '' },
        { label: 'Color', type: 'text', name: 'color', value: baseSectionStyles.color ? String(baseSectionStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: baseSectionStyles.fontSize ? String(baseSectionStyles.fontSize) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: baseSectionStyles.padding ? String(baseSectionStyles.padding) : '' },
        { label: 'Padding Left', type: 'text', name: 'paddingLeft', value: baseSectionStyles.paddingLeft ? String(baseSectionStyles.paddingLeft) : '' },
        { label: 'Padding Top', type: 'text', name: 'paddingTop', value: baseSectionStyles.paddingTop ? String(baseSectionStyles.paddingTop) : '' },
        { label: 'Padding Right', type: 'text', name: 'paddingRight', value: baseSectionStyles.paddingRight ? String(baseSectionStyles.paddingRight) : '' },
        { label: 'Padding Bottom', type: 'text', name: 'paddingBottom', value: baseSectionStyles.paddingBottom ? String(baseSectionStyles.paddingBottom) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: baseSectionStyles.margin ? String(baseSectionStyles.margin) : '' },
        { label: 'Margin Left', type: 'text', name: 'marginLeft', value: baseSectionStyles.marginLeft ? String(baseSectionStyles.marginLeft) : '' },
        { label: 'Margin Top', type: 'text', name: 'marginTop', value: baseSectionStyles.marginTop ? String(baseSectionStyles.marginTop) : '' },
        { label: 'Margin Right', type: 'text', name: 'marginRight', value: baseSectionStyles.marginRight ? String(baseSectionStyles.marginRight) : '' },
        { label: 'Margin Bottom', type: 'text', name: 'marginBottom', value: baseSectionStyles.marginBottom ? String(baseSectionStyles.marginBottom) : '' },
        { label: 'Box Shadow', type: 'text', name: 'boxShadow', value: baseSectionStyles.boxShadow ? String(baseSectionStyles.boxShadow) : '' },
        { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseSectionStyles.borderRadius ? String(baseSectionStyles.borderRadius) : '' },
        { label: 'Text Align', type: 'text', name: 'textAlign', value: baseSectionStyles.textAlign ? String(baseSectionStyles.textAlign) : '' },
        { label: 'Display', type: 'text', name: 'display', value: baseSectionStyles.display ? String(baseSectionStyles.display) : '' },
        { label: 'Flex Direction', type: 'text', name: 'flexDirection', value: baseSectionStyles.flexDirection ? String(baseSectionStyles.flexDirection) : '' },
        { label: 'Justify Content', type: 'text', name: 'justifyContent', value: baseSectionStyles.justifyContent ? String(baseSectionStyles.justifyContent) : '' },
        { label: 'Align Items', type: 'text', name: 'alignItems', value: baseSectionStyles.alignItems ? String(baseSectionStyles.alignItems) : '' },
        { label: 'Gap', type: 'text', name: 'gap', value: baseSectionStyles.gap ? String(baseSectionStyles.gap) : '' },
    ], [baseSectionStyles]);


    const combinedHeaderStyles = {
        ...baseSectionStyles,
        backgroundColor: isOver ? '#C5CCD4' : baseSectionStyles.backgroundColor,
    };


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

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'button';
            removeButton.addEventListener('click', () => {
                if (parentID === 'droppable') {
                    dispatch(removeComponentName(childIndex))
                } else {
                    dispatch(removeDivChild({ divId: parentID, componentIndex: childIndex }));

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
                    setbaseSectionStyles((prevStyles) => ({
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
                            setbaseSectionStyles((prevStyles) => ({
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

    const selectheaderChildren = createSelector(
        [(state: RootState) => state.headerChild, (_, droppableHeaderid: string) => droppableHeaderid],
        (headerChild, droppableHeaderid) => headerChild[droppableHeaderid] || []
    );
    const headerChildren = useSelector((state: RootState) => selectheaderChildren(state, droppableHeaderid));

    const renderComponent = (name: string, index: number) => {
        switch (name) {
            case 'div':
                return <DivComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'span':
                return <SpanComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'section':
                return <SectionComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            // case 'header':
            //     return <HeaderComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'footer':
                return <FooterComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'main':
                return <MainComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'article':
                return <ArticleComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'aside':
                return <AsideComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            case 'nav':
                return <NavComponent key={index} childIndex={index} parentID={droppableHeaderid} />;
            // case 'ul':
            //   return <UlComponent key={divIndex} divIndex={divIndex} />;
            // case 'ol':
            //   return <OlComponent key={divIndex} divIndex={divIndex} />;
            // case 'dl':
            //   return <DlComponent key={divIndex} divIndex={divIndex} />;
            // case 'fieldset':
            //   return <FieldSetComponent key={divIndex} divIndex={divIndex} />;
            // case 'form':
            //   return <FormComponent key={divIndex} divIndex={divIndex} />;
            // case 'table':
            //   return <TableComponent key={divIndex} divIndex={divIndex} />;
            // case 'iframe':
            //   return <IFrameComponent key={divIndex} divIndex={divIndex} />;
            // case 'figure':
            //   return <FigureComponent key={divIndex} divIndex={divIndex} />;
            // Add cases for other components
            default:
                return null; // Handle default case if necessary
        }
    };



    return (
        <header
            ref={setNodeHeader}
            className={`header-component-${childIndex}`}
            style={combinedHeaderStyles}
            onContextMenu={openContextMenu}
        >
            {`Header : \n  Child index: ${childIndex} \n parent id = ${parentID}`}
            {headerChildren.map((name: string, index: number) => renderComponent(name, index))}

        </header >
    );
};

export default HeaderComponent;
