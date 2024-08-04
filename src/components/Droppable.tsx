import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import FormComponent from './RenderComponents/FormComponent ';
import TableComponent from './RenderComponents/TableComponent ';
import IFrameComponent from './RenderComponents/IFrameComponent ';
import FigureComponent from './RenderComponents/FigureComponent ';
import ArticleComponent from './RenderComponents/ArticleComponent';
import ImageComponent from './RenderComponents/ImageComponent';
import VideoComponent from './RenderComponents/VideoComponent';
import AudioComponent from './RenderComponents/AudioComponent';
import SelectComponent from './RenderComponents/SelectComponent';
import ParagraphComponent from './RenderComponents/ParagraphComponent';


interface DroppableProps {
    draggedItemType: string | null;
}

const Droppable: React.FC<DroppableProps> = ({ draggedItemType }) => {
    const componentNames = useSelector((state: RootState) => state.componentNames.names);
    const memoizedcomponentNames = useMemo(() => componentNames, [componentNames]);
    const [componentsData, setComponentsData] = useState<Record<string, { html: string, css: string }>>({});
    const [showCode, setShowCode] = useState(false);
    const [codeType, setCodeType] = useState<'html' | 'css'>('html');
    const codeRef = useRef<HTMLPreElement>(null);

    const handleChildUpdate = useCallback((childId: string, html: string, css: string) => {
        setComponentsData(prevData => ({
            ...prevData,
            [childId]: { html, css }
        }));
    }, []);
    const handleChildRemove = useCallback((childId: string) => {
        setComponentsData(prevData => {
            const newData = { ...prevData };
            delete newData[childId];
            return newData;
        });
    }, []);

    const { mergedHTML, mergedCSS } = useMemo(() => {
        let html = '';
        let css = '';
        Object.values(componentsData).forEach(data => {
            html += data.html + '\n';
            css += data.css + '\n';
        });
        return { mergedHTML: html, mergedCSS: css };
    }, [componentsData]);


    const accept = ["div",
        "section",
        "header",
        "footer",
        "main",
        "article",
        "aside",
        "dropdown",
        "nav",
        "ul",
        "ol",
        "dl",
        "form",
        "table",
        "img",
        "video",
        "audio",
        "paragraph",
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
        "section"]

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
        data: {
            accepts: accept,
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
        cursor: !isOver ? 'default' : isOver && (draggedItemType !== null && accept.includes(draggedItemType))
            ? 'default'
            : 'not-allowed',

    };


    const renderComponent = (childIndex: number, name: string, parentID: string) => {
        switch (name) {
            case 'div':
                return <DivComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'span':
                return <SpanComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'section':
                return <SectionComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'header':
                return <HeaderComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'footer':
                return <FooterComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'main':
                return <MainComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'article':
                return <ArticleComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'aside':
                return <AsideComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'dropdown':
                return <SelectComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'nav':
                return <NavComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'ul':
                return <UlComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'ol':
                return <OlComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'dl':
                return <DlComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'paragraph':
                return <ParagraphComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'img':
                return <ImageComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'video':
                return <VideoComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'audio':
                return <AudioComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'form':
                return <FormComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    draggedItemType={draggedItemType}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'table':
                return <TableComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'iframe':
                return <IFrameComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove} />;
            case 'figure':
                return <FigureComponent
                    key={childIndex}
                    childIndex={childIndex}
                    parentID={parentID}

                    onRemove={handleChildRemove} />;
            // Add cases for other components
            default:
                return null;
        }
    };

    const handleShowHideCode = (type: 'html' | 'css') => {
        setShowCode(prev => !prev);
        setCodeType(type);
    };

    const handleCopyCode = (type: 'html' | 'css') => {
        const codeToCopy = type === 'html' ? mergedHTML : mergedCSS;
        navigator.clipboard.writeText(codeToCopy).then(() => {
            alert(`${type.toUpperCase()} copied to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <React.Fragment>
            <div ref={setNodeRef} style={style}>
                {Object.entries(memoizedcomponentNames).map(([childIndex, name]) => (
                    renderComponent(Number(childIndex), name, 'droppable')
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => handleShowHideCode('html')}>
                    {showCode && codeType === 'html' ? 'Hide HTML' : 'Show HTML'}
                </button>
                <button onClick={() => handleCopyCode('html')}>Copy HTML</button>
                <button onClick={() => handleShowHideCode('css')}>
                    {showCode && codeType === 'css' ? 'Hide CSS' : 'Show CSS'}
                </button>
                <button onClick={() => handleCopyCode('css')}>Copy CSS</button>
            </div>
            {showCode && (
                <div>
                    <h3>{codeType === 'html' ? 'HTML' : 'CSS'}</h3>
                    <pre ref={codeRef}>
                        {codeType === 'html' ? mergedHTML : mergedCSS}
                    </pre>
                </div>
            )}
        </React.Fragment>
    );
};

export default Droppable;



