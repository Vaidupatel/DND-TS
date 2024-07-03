import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import DivComponent from './RenderComponents/DivComponent';
import SpanComponent from './RenderComponents/SpanComponent ';
import SectionComponent from './RenderComponents/SectionComponent ';

interface RenderComponentProps {
    id: string;
}

const RenderComponent: React.FC<RenderComponentProps> = ({ id }) => {
    const component = useSelector((state: RootState) => state.componentTree.components[id]);

    if (!component) return null;

    const renderChildren = () => {
        return component.children.map((childId) => (
            <RenderComponent key={childId} id={childId} />
        ));
    };

    switch (component.type) {
        case 'div':
            return <DivComponent id={id}>{id}{renderChildren()}</DivComponent>;
        case 'span':
            return <SpanComponent id={id}>{renderChildren()}</SpanComponent>;
        case 'section':
            return <SectionComponent id={id}>{renderChildren()}</SectionComponent>;
        default:
            return null;
    }
};

export default RenderComponent;