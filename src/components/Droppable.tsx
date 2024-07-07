// import React, { useMemo } from 'react';
// import { useDroppable } from '@dnd-kit/core';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import DivComponent from './RenderComponents/DivComponent';
// import SpanComponent from './RenderComponents/SpanComponent ';
// import SectionComponent from './RenderComponents/SectionComponent ';
// import HeaderComponent from './RenderComponents/HeaderComponent ';
// import FooterComponent from './RenderComponents/FooterComponent ';
// import MainComponent from './RenderComponents/MainComponent ';
// import AsideComponent from './RenderComponents/AsideComponent ';
// import NavComponent from './RenderComponents/NavComponent ';
// import UlComponent from './RenderComponents/UlComponent ';
// import OlComponent from './RenderComponents/OlComponent ';
// import DlComponent from './RenderComponents/DlComponent ';
// import FieldSetComponent from './RenderComponents/FieldSetComponent ';
// import FormComponent from './RenderComponents/FormComponent ';
// import TableComponent from './RenderComponents/TableComponent ';
// import IFrameComponent from './RenderComponents/IFrameComponent ';
// import FigureComponent from './RenderComponents/FigureComponent ';
// import ArticleComponent from './RenderComponents/ArticleComponent';

// const Droppable: React.FC = () => {
//     const componentNames = useSelector((state: RootState) => state.componentNames.names);
//     const memoizedcomponentNames = useMemo(() => componentNames, [componentNames]);


//     const { isOver, setNodeRef } = useDroppable({
//         id: 'droppable',
//     });

//     const style: React.CSSProperties = {
//         border: '2px dashed gray',
//         height: '100vh', // Adjust as needed
//         width: '100vwpx', // Adjust as needed
//         backgroundColor: isOver ? '#C5CCD4' : '#fff',
//         transition: 'background-color 0.2s',
//         overflow: "scroll",
//         WebkitOverflowScrolling: "touch",
//         scrollbarWidth: 'none',
//     };



//     const renderComponent = (childIndex: number, name: string, parentID: string) => {
//         switch (name) {
//             case 'div':
//                 return <DivComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'span':
//                 return <SpanComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'section':
//                 return <SectionComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'header':
//                 return <HeaderComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'footer':
//                 return <FooterComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'main':
//                 return <MainComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'article':
//                 return <ArticleComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'aside':
//                 return <AsideComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'nav':
//                 return <NavComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'ul':
//                 return <UlComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'ol':
//                 return <OlComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'dl':
//                 return <DlComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'fieldset':
//                 return <FieldSetComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'form':
//                 return <FormComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'table':
//                 return <TableComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'iframe':
//                 return <IFrameComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             case 'figure':
//                 return <FigureComponent key={childIndex} childIndex={childIndex} parentID={parentID} depth={depth} />;
//             // Add cases for other components
//             default:
//                 return null; // Handle default case if necessary
//         }
//     };
//     return (
//         <div ref={setNodeRef} style={style}>
//             {Object.entries(memoizedcomponentNames).map(([childIndex, name]) => (
//                 renderComponent(Number(childIndex), name, 'droppable')
//             ))}
//         </div>
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
import AsideComponent from './RenderComponents/AsideComponent ';
import NavComponent from './RenderComponents/NavComponent ';
import UlComponent from './RenderComponents/UlComponent ';
import OlComponent from './RenderComponents/OlComponent ';
import DlComponent from './RenderComponents/DlComponent ';
import FieldSetComponent from './RenderComponents/FieldSetComponent ';
import FormComponent from './RenderComponents/FormComponent ';
import TableComponent from './RenderComponents/TableComponent ';
import IFrameComponent from './RenderComponents/IFrameComponent ';
import FigureComponent from './RenderComponents/FigureComponent ';
import ArticleComponent from './RenderComponents/ArticleComponent';


interface DroppableProps {
    draggedItemType: string | null;
}
const Droppable: React.FC<DroppableProps> = ({ draggedItemType }) => {
    const componentNames = useSelector((state: RootState) => state.componentNames.names);
    const memoizedcomponentNames = useMemo(() => componentNames, [componentNames]);


    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
        data: {
            accepts: ["div",
                "section",
                "header",
                "footer",
                "main",
                "article",
                "aside",
                "nav",
                "ul",
                "ol",
                "dl",
                "form",
                "table",
                "img",
                "p",
                "span",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "address",
                "article",
                "aside",
                "footer",
                "header",
                "hgroup",
                "main",
                "nav",
                "section"],
        },
    });

    const style: React.CSSProperties = {
        border: '2px dashed gray',
        height: '100vh', // Adjust as needed
        width: '100vw', // Adjust as needed
        backgroundColor: isOver ? '#C5CCD4' : '#fff',
        transition: 'background-color 0.2s',
        overflow: "scroll",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: 'none',
        cursor: !isOver ? 'default' : isOver && (draggedItemType !== null && ["div",
            "section",
            "header",
            "footer",
            "main",
            "article",
            "aside",
            "nav",
            "ul",
            "ol",
            "dl",
            "form",
            "table",
            "img",
            "p",
            "span",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "address",
            "article",
            "aside",
            "footer",
            "header",
            "hgroup",
            "main",
            "nav",
            "section"].includes(draggedItemType))
            ? 'default'
            : 'not-allowed',

    };


    const renderComponent = (childIndex: number, name: string, parentID: string) => {
        switch (name) {
            case 'div':
                return <DivComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'span':
                return <SpanComponent key={childIndex} childIndex={childIndex} parentID={parentID} draggedItemType={draggedItemType} />;
            case 'section':
                return <SectionComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'header':
                return <HeaderComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'footer':
                return <FooterComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'main':
                return <MainComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'article':
                return <ArticleComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'aside':
                return <AsideComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'nav':
                return <NavComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'ul':
                return <UlComponent key={childIndex} childIndex={childIndex} parentID={parentID} draggedItemType={draggedItemType} />;
            case 'ol':
                return <OlComponent key={childIndex} childIndex={childIndex} parentID={parentID} draggedItemType={draggedItemType} />;
            case 'dl':
                return <DlComponent key={childIndex} childIndex={childIndex} parentID={parentID} draggedItemType={draggedItemType} />;
            case 'fieldset':
                return <FieldSetComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'form':
                return <FormComponent key={childIndex} childIndex={childIndex} parentID={parentID} draggedItemType={draggedItemType} />;
            case 'table':
                return <TableComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'iframe':
                return <IFrameComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
            case 'figure':
                return <FigureComponent key={childIndex} childIndex={childIndex} parentID={parentID} />;
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
