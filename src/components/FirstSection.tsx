// import React, { useEffect, useRef, useState } from 'react';
// import './FirstSection.css';
// import { DndContext, DragEndEvent } from '@dnd-kit/core';
// import Droppable from './Droppable';
// import { layoutComponents, listComponents, formComponents, tableComponents, mediaComponents, textComponents, documentMetadata, scriptingComponents, interactiveElements, headingComponents, semanticComponents } from './HTMLElement';

// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { setInitialDivChild } from '../store/slices/divChildListSlice';
// import { addComponentName, clearComponentNames } from '../store/slices/componentNamesSlice';
// import { addDivChild } from '../store/slices/divChildListSlice';
// import { addSpanChild, setInitialSpanChild } from '../store/slices/spanChildSlice';
// import { addSectionChild, setInitialSectionChild } from '../store/slices/sectionChildSlice';
// import { addHeaderChild, setInitialHeaderChild } from '../store/slices/headerChildSlice';
// import { addMainChild, setInitialMainChild } from '../store/slices/mainChildSlice';
// import { addFooterChild, setInitialFooterChild } from '../store/slices/footerChildSlice';
// import { addAsideChild, setInitialAsideChild } from '../store/slices/asideChildSlice';
// import { addNavChild, setInitialNavChild } from '../store/slices/navChildSlice';
// import { addUlChild, setInitialUlChild } from '../store/slices/ulChildSlice';
// import { addOlChild, setInitialOlChild } from '../store/slices/olChildSlice';
// import { addDlChild, setInitialDlChild } from '../store/slices/dlChildSlice';
// import { addFieldSetChild, setInitialFieldSetChild } from '../store/slices/fieldsetChildSlice';
// import { addFormChild, setInitialFormChild } from '../store/slices/formChildSlice';
// import { addTableChild, setInitialTableChild } from '../store/slices/tableChildSlice';
// import { addIFrameChild, setInitialIFrameChild } from '../store/slices/iFrameChildSlice';
// import { addFigureChild, setInitialFigureChild } from '../store/slices/figureChildSlice';
// import { addArticleChild, setInitialArticleChild } from '../store/slices/articleChildSlice';
// import Dropdown from './DropdownComponent';
// import { Components } from './types';


// const FirstSection: React.FC = () => {


//     const dispatch = useDispatch<AppDispatch>();
//     const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//     const dropdownRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             dropdownRefs.current.forEach((dropdownRef, index) => {
//                 if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                     if (openDropdown === dropdownConfigs[index].label) {
//                         setOpenDropdown(null);
//                     }
//                 }
//             });
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [openDropdown]);

//     const handleDragEnd = (event: DragEndEvent) => {
//         const { active, over } = event;
//         if (over) {
//             const droppableId = over.id.toString();
//             const componentsArrays: Components[] = [
//                 layoutComponents,
//                 listComponents,
//                 formComponents,
//                 tableComponents,
//                 mediaComponents,
//                 textComponents,
//                 documentMetadata,
//                 scriptingComponents,
//                 interactiveElements,
//                 headingComponents,
//                 semanticComponents
//             ];

//             let componentName: string | undefined;

//             for (const components of componentsArrays) {
//                 componentName = components[Number(active.id)];
//                 if (componentName) {
//                     break;
//                 }
//             }
//             if (droppableId === 'droppable') {
//                 if (componentName) {
//                     dispatch(addComponentName(componentName));
//                 }
//             } else if (droppableId.startsWith('droppableDiv-')) {
//                 const divIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addDivChild({ DivId: divIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableSpan-')) {
//                 const spanIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addSpanChild({ SpanId: spanIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableSection-')) {
//                 const sectionIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addSectionChild({ SectionId: sectionIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableHeader-')) {
//                 const headerIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addHeaderChild({ HeaderId: headerIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableFooter-')) {
//                 const FooterIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addFooterChild({ FooterId: FooterIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableMain-')) {
//                 const MainIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addMainChild({ MainId: MainIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableArticle-')) {
//                 const ArticleIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addArticleChild({ ArticleId: ArticleIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableAside-')) {
//                 const AsideIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addAsideChild({ AsideId: AsideIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableNav-')) {
//                 const NavIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addNavChild({ NavId: NavIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableUl-')) {
//                 const UlIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addUlChild({ UlId: UlIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableOl-')) {
//                 const OlIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addOlChild({ OlId: OlIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableDl-')) {
//                 const DlIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addDlChild({ DlId: DlIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableFieldSet-')) {
//                 const FieldSetIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addFieldSetChild({ FieldSetId: FieldSetIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableForm-')) {
//                 const FormIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addFormChild({ FormId: FormIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableTable-')) {
//                 const TableIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addTableChild({ TableId: TableIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableIFrame-')) {
//                 const IFrameIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addIFrameChild({ IFrameId: IFrameIndex, componentName }));
//                 }
//             } else if (droppableId.startsWith('droppableFigure-')) {
//                 const FigureIndex = droppableId;
//                 if (componentName) {
//                     dispatch(addFigureChild({ FigureId: FigureIndex, componentName }));
//                 }
//             }

//             setOpenDropdown(null);
//         }
//     }



//     const initialActions = [
//         clearComponentNames,
//         setInitialDivChild,
//         setInitialSpanChild,
//         setInitialSectionChild,
//         setInitialHeaderChild,
//         setInitialFooterChild,
//         setInitialMainChild,
//         setInitialArticleChild,
//         setInitialAsideChild,
//         setInitialNavChild,
//         setInitialUlChild,
//         setInitialOlChild,
//         setInitialDlChild,
//         setInitialFieldSetChild,
//         setInitialFormChild,
//         setInitialTableChild,
//         setInitialIFrameChild,
//         setInitialFigureChild,
//     ];

//     const clearAll = () => {
//         initialActions.forEach(action => dispatch(action()));
//     };

//     const dropdownConfigs = [
//         { components: layoutComponents, label: "Layout Components" },
//         { components: listComponents, label: "List Components" },
//         { components: formComponents, label: "Form Components" },
//         { components: tableComponents, label: "Table Components" },
//         { components: mediaComponents, label: "Media Components" },
//         { components: textComponents, label: "Text Components" },
//         { components: documentMetadata, label: "Document Metadata" },
//         { components: scriptingComponents, label: "Scripting Components" },
//         { components: interactiveElements, label: "Interactive Elements" },
//         { components: headingComponents, label: "Heading Components" },
//         { components: semanticComponents, label: "Semantic Components" }
//     ];
//     dropdownRefs.current = dropdownConfigs.map(
//         (_, index) => dropdownRefs.current[index] ?? React.createRef()
//     );
//     return (
//         <DndContext onDragEnd={handleDragEnd}>
//             <section>
//                 <div className='component-menu' >
//                     {dropdownConfigs.map((config, index) => (
//                         <Dropdown
//                             key={index}
//                             components={config.components}
//                             label={config.label}
//                             isOpen={openDropdown === config.label}
//                             onToggle={() => setOpenDropdown(openDropdown === config.label ? null : config.label)}
//                             dropdownRef={dropdownRefs.current[index]}

//                         />
//                     ))}
//                 </div>
//                 <Droppable />
//                 <div style={styles[0].addedComp}>
//                     <button className='button' onClick={clearAll}>Clear all components</button>
//                     <p>Added Components:</p>

//                 </div>
//             </section>
//         </DndContext>
//     );
// };

// export default FirstSection;


// const styles: { addedComp?: React.CSSProperties, listOuterStyle?: React.CSSProperties, listInnerStyle?: React.CSSProperties }[] = [
//     {
//         addedComp: {
//             padding: "1rem"
//         },
//         listOuterStyle: {
//             listStyleType: "circle",
//             padding: "1rem"
//         }, listInnerStyle: {
//             listStyleType: "circle",
//             padding: "1rem"
//         }
//     }
// ]





















import React, { useEffect, useRef, useState } from 'react';
import './FirstSection.css';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import Droppable from './Droppable';
import { layoutComponents, listComponents, formComponents, tableComponents, mediaComponents, textComponents, documentMetadata, scriptingComponents, interactiveElements, headingComponents, semanticComponents } from './HTMLElement';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setInitialDivChild } from '../store/slices/divChildListSlice';
import { addComponentName, clearComponentNames } from '../store/slices/componentNamesSlice';
import { addDivChild } from '../store/slices/divChildListSlice';
import { addSpanChild, setInitialSpanChild } from '../store/slices/spanChildSlice';
import { addSectionChild, setInitialSectionChild } from '../store/slices/sectionChildSlice';
import { addHeaderChild, setInitialHeaderChild } from '../store/slices/headerChildSlice';
import { addMainChild, setInitialMainChild } from '../store/slices/mainChildSlice';
import { addFooterChild, setInitialFooterChild } from '../store/slices/footerChildSlice';
import { addAsideChild, setInitialAsideChild } from '../store/slices/asideChildSlice';
import { addNavChild, setInitialNavChild } from '../store/slices/navChildSlice';
import { addUlChild, setInitialUlChild } from '../store/slices/ulChildSlice';
import { addOlChild, setInitialOlChild } from '../store/slices/olChildSlice';
import { addDlChild, setInitialDlChild } from '../store/slices/dlChildSlice';
import { addFieldSetChild, setInitialFieldSetChild } from '../store/slices/fieldsetChildSlice';
import { addFormChild, setInitialFormChild } from '../store/slices/formChildSlice';
import { addTableChild, setInitialTableChild } from '../store/slices/tableChildSlice';
import { addIFrameChild, setInitialIFrameChild } from '../store/slices/iFrameChildSlice';
import { addFigureChild, setInitialFigureChild } from '../store/slices/figureChildSlice';
import { addArticleChild, setInitialArticleChild } from '../store/slices/articleChildSlice';
import Dropdown from './DropdownComponent';
import { Components } from './types';


const FirstSection: React.FC = () => {


    const dispatch = useDispatch<AppDispatch>();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const dropdownRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            dropdownRefs.current.forEach((dropdownRef, index) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    if (openDropdown === dropdownConfigs[index].label) {
                        setOpenDropdown(null);
                    }
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    const [draggedItemType, setDraggedItemType] = useState<string | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const componentsArrays: Components[] = [
            layoutComponents,
            listComponents,
            formComponents,
            tableComponents,
            mediaComponents,
            textComponents,
            documentMetadata,
            scriptingComponents,
            interactiveElements,
            headingComponents,
            semanticComponents
        ];

        for (const components of componentsArrays) {
            const componentName = components[Number(active.id)];
            if (componentName) {
                setDraggedItemType(componentName);
                break;
            }
        }
    };


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over) {
            const droppableId = over.id.toString();
            const componentsArrays: Components[] = [
                layoutComponents,
                listComponents,
                formComponents,
                tableComponents,
                mediaComponents,
                textComponents,
                documentMetadata,
                scriptingComponents,
                interactiveElements,
                headingComponents,
                semanticComponents
            ];

            let componentName: string | undefined;

            for (const components of componentsArrays) {
                componentName = components[Number(active.id)];
                if (componentName) {
                    break;
                }
            }
            if (componentName && (!over.data.current || !over.data.current.accepts || over.data.current.accepts.includes(componentName))) {
                if (droppableId === 'droppable') {
                    if (componentName) {
                        dispatch(addComponentName(componentName));
                    }
                } else if (droppableId.startsWith('droppableDiv-')) {
                    const divIndex = droppableId;
                    if (componentName) {
                        dispatch(addDivChild({ DivId: divIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableSpan-')) {
                    const spanIndex = droppableId;
                    if (componentName) {
                        dispatch(addSpanChild({ SpanId: spanIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableSection-')) {
                    const sectionIndex = droppableId;
                    if (componentName) {
                        dispatch(addSectionChild({ SectionId: sectionIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableHeader-')) {
                    const headerIndex = droppableId;
                    if (componentName) {
                        dispatch(addHeaderChild({ HeaderId: headerIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableFooter-')) {
                    const FooterIndex = droppableId;
                    if (componentName) {
                        dispatch(addFooterChild({ FooterId: FooterIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableMain-')) {
                    const MainIndex = droppableId;
                    if (componentName) {
                        dispatch(addMainChild({ MainId: MainIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableArticle-')) {
                    const ArticleIndex = droppableId;
                    if (componentName) {
                        dispatch(addArticleChild({ ArticleId: ArticleIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableAside-')) {
                    const AsideIndex = droppableId;
                    if (componentName) {
                        dispatch(addAsideChild({ AsideId: AsideIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableNav-')) {
                    const NavIndex = droppableId;
                    if (componentName) {
                        dispatch(addNavChild({ NavId: NavIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableUl-')) {
                    const UlIndex = droppableId;
                    if (componentName) {
                        dispatch(addUlChild({ UlId: UlIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableOl-')) {
                    const OlIndex = droppableId;
                    if (componentName) {
                        dispatch(addOlChild({ OlId: OlIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableDl-')) {
                    const DlIndex = droppableId;
                    if (componentName) {
                        dispatch(addDlChild({ DlId: DlIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableFieldSet-')) {
                    const FieldSetIndex = droppableId;
                    if (componentName) {
                        dispatch(addFieldSetChild({ FieldSetId: FieldSetIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableForm-')) {
                    const FormIndex = droppableId;
                    if (componentName) {
                        dispatch(addFormChild({ FormId: FormIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableTable-')) {
                    const TableIndex = droppableId;
                    if (componentName) {
                        dispatch(addTableChild({ TableId: TableIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableIFrame-')) {
                    const IFrameIndex = droppableId;
                    if (componentName) {
                        dispatch(addIFrameChild({ IFrameId: IFrameIndex, componentName }));
                    }
                } else if (droppableId.startsWith('droppableFigure-')) {
                    const FigureIndex = droppableId;
                    if (componentName) {
                        dispatch(addFigureChild({ FigureId: FigureIndex, componentName }));
                    }
                }
            }

            setOpenDropdown(null);
            setDraggedItemType(null);
        }
    }



    const initialActions = [
        clearComponentNames,
        setInitialDivChild,
        setInitialSpanChild,
        setInitialSectionChild,
        setInitialHeaderChild,
        setInitialFooterChild,
        setInitialMainChild,
        setInitialArticleChild,
        setInitialAsideChild,
        setInitialNavChild,
        setInitialUlChild,
        setInitialOlChild,
        setInitialDlChild,
        setInitialFieldSetChild,
        setInitialFormChild,
        setInitialTableChild,
        setInitialIFrameChild,
        setInitialFigureChild,
    ];

    const clearAll = () => {
        initialActions.forEach(action => dispatch(action()));
    };

    const dropdownConfigs = [
        { components: layoutComponents, label: "Layout Components" },
        { components: listComponents, label: "List Components" },
        { components: formComponents, label: "Form Components" },
        { components: tableComponents, label: "Table Components" },
        { components: mediaComponents, label: "Media Components" },
        { components: textComponents, label: "Text Components" },
        { components: documentMetadata, label: "Document Metadata" },
        { components: scriptingComponents, label: "Scripting Components" },
        { components: interactiveElements, label: "Interactive Elements" },
        { components: headingComponents, label: "Heading Components" },
        { components: semanticComponents, label: "Semantic Components" }
    ];
    dropdownRefs.current = dropdownConfigs.map(
        (_, index) => dropdownRefs.current[index] ?? React.createRef()
    );
    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <section>
                <div className='component-menu' >
                    {dropdownConfigs.map((config, index) => (
                        <Dropdown
                            key={index}
                            components={config.components}
                            label={config.label}
                            isOpen={openDropdown === config.label}
                            onToggle={() => setOpenDropdown(openDropdown === config.label ? null : config.label)}
                            dropdownRef={dropdownRefs.current[index]}

                        />
                    ))}
                </div>
                <Droppable draggedItemType={draggedItemType} />
                <div style={styles[0].addedComp}>
                    <button className='button' onClick={clearAll}>Clear all components</button>
                    <p>Added Components:</p>

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




