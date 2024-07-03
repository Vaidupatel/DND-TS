// import React from 'react';
// import { useDroppable } from '@dnd-kit/core';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import DivComponent from './RenderComponents/DivComponent';
// import SpanComponent from './RenderComponents/SpanComponent ';
// import SectionComponent from './RenderComponents/SectionComponent ';
// import HeaderComponent from './RenderComponents/HeaderComponent ';
// import FooterComponent from './RenderComponents/FooterComponent ';
// import MainComponent from './RenderComponents/MainComponent ';
// import ArticaleComponent from './RenderComponents/ArticaleComponent ';
// import AsideComponent from './RenderComponents/AsideComponent ';
// import { componentsObject } from './FirstSection';
// // import NavComponent from './RenderComponents/NavComponent ';
// // import UlComponent from './RenderComponents/UlComponent ';
// // import OlComponent from './RenderComponents/OlComponent ';
// // import DlComponent from './RenderComponents/DlComponent ';
// // import FigureComponent from './RenderComponents/FigureComponent ';
// // import FieldSetComponent from './RenderComponents/FieldSetComponent ';
// // import FormComponent from './RenderComponents/FormComponent ';
// // import TableComponent from './RenderComponents/TableComponent ';
// // import IFrameComponent from './RenderComponents/IFrameComponent ';

// // Reander Components

// const Droppable: React.FC = () => {
//     const componentNames = useSelector((state: RootState) => state.componentNames.names);

//     const { isOver, setNodeRef } = useDroppable({
//         id: 'droppable',
//     });

//     const style: React.CSSProperties = {
//         border: '2px dashed gray',
//         height: '100vh',
//         width: '100vw',
//         backgroundColor: isOver ? '#C5CCD4' : '#fff',
//         transition: 'background-color 0.2s',
//     };

//     const renderComponent = (index: number, name: string,) => {
//         switch (name) {
//             case 'div':
//                 return <DivComponent key={index} index={index} />;
//             case 'span':
//                 return <SpanComponent key={index} index={index} />;
//             // case 'section':
//             //     return <SectionComponent key={index} index={index} />;
//             // case 'header':
//             //     return <HeaderComponent key={index} index={index} />;
//             // case 'footer':
//             //     return <FooterComponent key={index} index={index} />;
//             // case 'main':
//             //     return <MainComponent key={index} index={index} />;
//             // case 'article':
//             //     return <ArticaleComponent key={index} index={index} />;
//             // case 'aside':
//             //     return <AsideComponent key={index} index={index} />;
//             // case 'nav':
//             //     return <NavComponent key={index} index={index} />;
//             // case 'ul':
//             //     return <UlComponent key={index} index={index} />;
//             // case 'ol':
//             //     return <OlComponent key={index} index={index} />;
//             // case 'dl':
//             //     return <DlComponent key={index} index={index} />;
//             // case 'fieldset':
//             //     return <FieldSetComponent key={index} index={index} />;
//             // case 'form':
//             //     return <FormComponent key={index} index={index} />;
//             // case 'table':
//             //     return <TableComponent key={index} index={index} />;
//             // case 'iframe':
//             //     return <IFrameComponent key={index} index={index} />;
//             // case 'figure':
//             //     return <FigureComponent key={index} index={index} />;
//             // Add cases for other components
//             default:
//                 return null; // Handle default case if necessary
//         }
//     };



//     return (
//         <div ref={setNodeRef} style={style}>
//             {/* {children} */}
//             {Object.entries(componentNames).map(([index, name]) => (
//                 renderComponent(Number(index), name)
//             ))}
//         </div >
//     );
// };

// export default Droppable;


















import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import DivComponent from './RenderComponents/DivComponent';
import SpanComponent from './RenderComponents/SpanComponent ';
import SectionComponent from './RenderComponents/SectionComponent ';
import HeaderComponent from './RenderComponents/HeaderComponent ';
import FooterComponent from './RenderComponents/FooterComponent ';
import MainComponent from './RenderComponents/MainComponent ';
import ArticaleComponent from './RenderComponents/ArticaleComponent ';
import AsideComponent from './RenderComponents/AsideComponent ';
import NavComponent from './RenderComponents/NavComponent ';

const Droppable: React.FC = () => {
    const componentNames = useSelector((state: RootState) => state.componentNames.names);
    const memoizedcomponentNames = useMemo(() => componentNames, [componentNames]);


    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });

    const style: React.CSSProperties = {
        border: '2px dashed gray',
        height: '100vh', // Adjust as needed
        width: '100vwpx', // Adjust as needed
        backgroundColor: isOver ? '#C5CCD4' : '#fff',
        transition: 'background-color 0.2s',
        overflow: "scroll",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: 'none',
    };



    const renderComponent = (childIndex: number, name: string, parentID: string) => {
        switch (name) {
            case 'div':
                return <DivComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'span':
                return <SpanComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'section':
                return <SectionComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'header':
                return <HeaderComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'footer':
                return <FooterComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'main':
                return <MainComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'article':
                return <ArticaleComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'aside':
                return <AsideComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'nav':
                return <NavComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            // case 'ul':
            //     return <UlComponent key={index} index={index} />;
            // case 'ol':
            //     return <OlComponent key={index} index={index} />;
            // case 'dl':
            //     return <DlComponent key={index} index={index} />;
            // case 'fieldset':
            //     return <FieldSetComponent key={index} index={index} />;
            // case 'form':
            //     return <FormComponent key={index} index={index} />;
            // case 'table':
            //     return <TableComponent key={index} index={index} />;
            // case 'iframe':
            //     return <IFrameComponent key={index} index={index} />;
            // case 'figure':
            //     return <FigureComponent key={index} index={index} />;
            // Add cases for other components
            default:
                return null; // Handle default case if necessary
        }
    };
    return (
        <div ref={setNodeRef} style={style}>
            {Object.entries(memoizedcomponentNames).map(([childIndex, name]) => (
                renderComponent(Number(childIndex), name, 'droppable')
            ))}
        </div>
    );
};

export default Droppable;
