import React, { useEffect, useRef, useState } from 'react';
import './FirstSection.css';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

import { addComponentName, clearComponentNames } from '../store/componentNamesSlice';
import { addDivChild } from '../store/divChildListSlice';
import { addSpanChild } from '../store/spanChildSlice';
import { addSectionChild } from '../store/sectionChildSlice';
import { addHeaderChild } from '../store/headerChildSlice';
import { addMainChild } from '../store/mainChildSlice';
import { addArticaleChild } from '../store/articaleChildSlice';
import { addFooterChild } from '../store/footerChildSlice';
import { addAsideChild } from '../store/asideChildSlice';
import { addNavChild } from '../store/navChildSlice';

export const componentsObject: { [key: number]: string } = {
    1: 'div',
    2: 'span',
    3: 'section',
    4: 'header',
    5: 'footer',
    6: 'main',
    7: 'article',
    8: 'aside',
    9: 'nav',
    10: 'ul',
    11: 'ol',
    12: 'dl',
    13: 'fieldset',
    14: 'form',
    15: 'table',
    16: 'iframe',
    17: 'figure',
};

const FirstSection: React.FC = () => {

    const addedComponentNames = useSelector((state: RootState) => state.componentNames.names);
    const divChildren = useSelector((state: RootState) => state.divChild);
    const spanChildren = useSelector((state: RootState) => state.spanChild);
    const sectionChildren = useSelector((state: RootState) => state.sectionChild);
    const headerChildren = useSelector((state: RootState) => state.headerChild);
    const footerChildren = useSelector((state: RootState) => state.footerChild);
    const mainChildren = useSelector((state: RootState) => state.mainChild);
    const asideChildren = useSelector((state: RootState) => state.asideChild);
    const navChildren = useSelector((state: RootState) => state.navChild);
    const articaleChildren = useSelector((state: RootState) => state.articaleChild);
    const dispatch = useDispatch<AppDispatch>();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over) {
            const droppableId = over.id.toString();
            const componentName = componentsObject[Number(active.id)];

            if (droppableId === 'droppable') {
                const componentName = componentsObject[Number(active.id)];
                if (componentName) {
                    toggleDropdown();
                    dispatch(addComponentName(componentName));
                }
            } else if (droppableId.startsWith('droppableDiv-')) {
                const divIndex = droppableId;
                if (componentName) {
                    dispatch(addDivChild({ divId: divIndex, componentName }));
                }
            } else if (droppableId.startsWith('droppableSpan-')) {
                const spanIndex = droppableId;
                if (componentName) {
                    dispatch(addSpanChild({ spanId: spanIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableSection-')) {
                const sectionIndex = droppableId;
                if (componentName) {
                    dispatch(addSectionChild({ sectionId: sectionIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableHeader-')) {
                const headerIndex = droppableId;
                if (componentName) {
                    dispatch(addHeaderChild({ HeaderId: headerIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableFooter-')) {
                const FooterIndex = droppableId;
                if (componentName) {
                    dispatch(addFooterChild({ FooterId: FooterIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableMain-')) {
                const MainIndex = droppableId;
                if (componentName) {
                    dispatch(addMainChild({ MainId: MainIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableArticle-')) {
                const ArticaleIndex = droppableId;
                if (componentName) {
                    dispatch(addArticaleChild({ ArticaleId: ArticaleIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableAside-')) {
                const AsideIndex = droppableId;
                if (componentName) {
                    dispatch(addAsideChild({ AsideId: AsideIndex, componentName }))
                }
            } else if (droppableId.startsWith('droppableNav-')) {
                const NavIndex = droppableId;
                if (componentName) {
                    dispatch(addNavChild({ NavId: NavIndex, componentName }))
                }
            }
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <section >
                <div ref={dropdownRef} className='component-menu'>
                    <button className='dropdown-button' onClick={toggleDropdown}>
                        Select Component
                    </button>
                    {dropdownOpen && (
                        <ul className='custom-dropdown'>
                            {Object.entries(componentsObject).map(([key, component]) => (
                                <li key={key} className='dropdown-item'>
                                    <Draggable id={key} content={component} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Droppable />
                <div style={styles[0].addedComp}>
                    <button className='button' onClick={() => dispatch(clearComponentNames())}>Clear all components</button>
                    <p>Added Components:</p>
                    <ul style={styles[0].listOuterStyle}>
                        {Object.entries(addedComponentNames).map(([index, name]) => (
                            <li key={index}>
                                <strong>{name}, {index}</strong>
                                {name === 'div' && divChildren[`droppableDiv-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {divChildren[`droppableDiv-${index}`].map((childComponent, childIndex) => (
                                            <li key={`div-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {name === 'span' && spanChildren[`droppableSpan-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {spanChildren[`droppableSpan-${index}`].map((childComponent, childIndex) => (
                                            <li key={`span-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {name === 'section' && sectionChildren[`droppableSection-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {sectionChildren[`droppableSection-${index}`].map((childComponent, childIndex) => (
                                            <li key={`section-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {name === 'header' && headerChildren[`droppableHeader-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {headerChildren[`droppableHeader-${index}`].map((childComponent, childIndex) => (
                                            <li key={`header-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}{name === 'footer' && footerChildren[`droppableFooter-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {footerChildren[`droppableFooter-${index}`].map((childComponent, childIndex) => (
                                            <li key={`footer-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {name === 'main' && mainChildren[`droppableMain-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {mainChildren[`droppableMain-${index}`].map((childComponent, childIndex) => (
                                            <li key={`main-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {name === 'article' && articaleChildren[`droppableArticle-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {articaleChildren[`droppableArticle-${index}`].map((childComponent, childIndex) => (
                                            <li key={`article-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}{name === 'aside' && asideChildren[`droppableAside-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {asideChildren[`droppableAside-${index}`].map((childComponent, childIndex) => (
                                            <li key={`article-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}{name === 'nav' && navChildren[`droppableNav-${index}`] && (
                                    <ul style={styles[0].listInnerStyle}>
                                        {navChildren[`droppableNav-${index}`].map((childComponent, childIndex) => (
                                            <li key={`nav-${index}-${childIndex}`}>
                                                {childComponent}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>


                </div>
            </section>
        </DndContext>
    );
};

export default FirstSection;


const styles: { addedComp?: React.CSSProperties, listOuterStyle?: React.CSSProperties, listInnerStyle?: React.CSSProperties }[] = [
    {
        addedComp: {
            padding: "1rem"
        },
        listOuterStyle: {
            listStyleType: "circle",
            padding: "1rem"
        }, listInnerStyle: {
            listStyleType: "circle",
            padding: "1rem"
        }
    }
]