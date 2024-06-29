import React from 'react';
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
import UlComponent from './RenderComponents/UlComponent ';
import OlComponent from './RenderComponents/OlComponent ';
import DlComponent from './RenderComponents/DlComponent ';
import FigureComponent from './RenderComponents/FigureComponent ';
import FieldSetComponent from './RenderComponents/FieldSetComponent ';
import FormComponent from './RenderComponents/FormComponent ';
import TableComponent from './RenderComponents/TableComponent ';
import IFrameComponent from './RenderComponents/IFrameComponent ';

// Reander Components

const Droppable: React.FC = ({ children }) => {
    const componentNames = useSelector((state: RootState) => state.componentNames.names);

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });

    const style: React.CSSProperties = {
        border: '2px dashed gray',
        height: '100%',
        width: '100%',
        backgroundColor: isOver ? '#f0f0f0' : '#ffffff',
        transition: 'background-color 0.2s',
    };

    const renderComponent = (name: string, index: number) => {
        switch (name) {
            case 'div':
                return <DivComponent key={index} index={index} />;
            case 'span':
                return <SpanComponent key={index} index={index} />;
            case 'section':
                return <SectionComponent key={index} index={index} />;
            case 'header':
                return <HeaderComponent key={index} index={index} />;
            case 'footer':
                return <FooterComponent key={index} index={index} />;
            case 'main':
                return <MainComponent key={index} index={index} />;
            case 'article':
                return <ArticaleComponent key={index} index={index} />;
            case 'aside':
                return <AsideComponent key={index} index={index} />;
            case 'nav':
                return <NavComponent key={index} index={index} />;
            case 'ul':
                return <UlComponent key={index} index={index} />;
            case 'ol':
                return <OlComponent key={index} index={index} />;
            case 'dl':
                return <DlComponent key={index} index={index} />;
            case 'fieldset':
                return <FieldSetComponent key={index} index={index} />;
            case 'form':
                return <FormComponent key={index} index={index} />;
            case 'table':
                return <TableComponent key={index} index={index} />;
            case 'iframe':
                return <IFrameComponent key={index} index={index} />;
            case 'figure':
                return <FigureComponent key={index} index={index} />;
            // Add cases for other components
            default:
                return null; // Handle default case if necessary
        }
    };


    return (
        <div ref={setNodeRef} style={style}>
            {children}
            {componentNames.map((name, index) => (
                <div key={index} className={`component-${name}`}>
                    {renderComponent(name, index)}
                </div>
            ))}
        </div >
    );
};

export default Droppable;
