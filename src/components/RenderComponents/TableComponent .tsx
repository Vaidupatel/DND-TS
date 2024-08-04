

// import React, { useEffect, useMemo, useState } from 'react';
// import { removeComponentName } from '../../store/slices/componentNamesSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useDroppable } from '@dnd-kit/core';
// import { createSelector } from '@reduxjs/toolkit';
// import { RootState } from '../../store/store';
// import { removeDivChild } from '../../store/slices/divChildListSlice';
// import { removeSpanChild } from '../../store/slices/spanChildSlice';
// import { removeSectionChild } from '../../store/slices/sectionChildSlice';
// import { removeHeaderChild } from '../../store/slices/headerChildSlice';
// import { removeFooterChild } from '../../store/slices/footerChildSlice';
// import { removeMainChild } from '../../store/slices/mainChildSlice';
// import { removeArticleChild } from '../../store/slices/articleChildSlice';
// import { removeAsideChild } from '../../store/slices/asideChildSlice';
// import { removeNavChild } from '../../store/slices/navChildSlice';
// import { removeUlChild } from '../../store/slices/ulChildSlice';
// import { removeOlChild } from '../../store/slices/olChildSlice';
// import { removeDlChild } from '../../store/slices/dlChildSlice';
// import { removeFieldSetChild } from '../../store/slices/fieldsetChildSlice';
// import { removeFormChild } from '../../store/slices/formChildSlice';
// import { removeTableChild } from '../../store/slices/tableChildSlice';
// import { removeIFrameChild } from '../../store/slices/iFrameChildSlice';
// import { removeFigureChild } from '../../store/slices/figureChildSlice';
// import DivComponent from './DivComponent';
// import SpanComponent from './SpanComponent ';
// import SectionComponent from './SectionComponent ';
// import HeaderComponent from './HeaderComponent ';
// import FooterComponent from './FooterComponent ';
// import MainComponent from './MainComponent ';
// import AsideComponent from './AsideComponent ';
// import NavComponent from './NavComponent ';
// import UlComponent from './UlComponent ';
// import DlComponent from './DlComponent ';
// import OlComponent from './OlComponent ';
// import FieldSetComponent from './FieldSetComponent ';

// import FormComponent from './FormComponent ';
// import ArticleComponent from './ArticleComponent';
// import IFrameComponent from './IFrameComponent ';
// import FigureComponent from './FigureComponent ';

// interface TableComponentProps {
//     childIndex: number;
//     parentID: string;
//     onUpdate: (childId: string, html: string, css: string) => void;
//     onRemove: (childId: string) => void;
//     depth: number;
//     maxDepth?: number;
// }
// interface TableData {
//     rows: number;
//     columns: number;
//     data: string[][];
// }

// let currentContextMenu: HTMLDivElement | null = null;

// const TableComponent: React.FC<TableComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove }) => {
//     const droppableTableid = `droppableTable-${parentID}-${childIndex}`;

//     const { isOver, setNodeRef: setTableNodeRef } = useDroppable({
//         id: droppableTableid,
//     });

//     const [tableStyles, setTableStyles] = useState<React.CSSProperties>({});
//     const [captionStyles, setCaptionStyles] = useState<React.CSSProperties>({});
//     const [tableCaption, setTableCaption] = useState<string>('Table Caption');
//     const [tableData, setTableData] = useState<TableData>({
//         rows: 2,
//         columns: 2,
//         data: [['', ''], ['', '']]
//     });

//     const [cellStyles, setCellStyles] = useState<React.CSSProperties>({
//         border: '2px solid' // Set default border
//     });

//     const dispatch = useDispatch();
//     const [searchTerm, setSearchTerm] = useState<string>('');

//     const combinedStyles = {
//         height: "10vh",
//         border: '1px solid #555',
//         backgroundColor: isOver ? '#C5CCD4' : tableStyles.backgroundColor,
//         ...tableStyles,
//     };

//     const tableStyleOptions = useMemo(() => [
//         { label: 'Border', type: 'text', name: 'border', value: tableStyles.border ? String(tableStyles.border) : '' },
//         { label: 'Height', type: 'text', name: 'height', value: tableStyles.height ? String(tableStyles.height) : '' },
//         { label: 'Width', type: 'text', name: 'width', value: tableStyles.width ? String(tableStyles.width) : '' },
//         { label: 'Background Color', type: 'text', name: 'backgroundColor', value: tableStyles.backgroundColor ? String(tableStyles.backgroundColor) : '' },
//         { label: 'Color', type: 'text', name: 'color', value: tableStyles.color ? String(tableStyles.color) : '' },
//         { label: 'Font Size', type: 'text', name: 'fontSize', value: tableStyles.fontSize ? String(tableStyles.fontSize) : '' },
//         { label: 'Padding', type: 'text', name: 'padding', value: tableStyles.padding ? String(tableStyles.padding) : '' },
//         { label: 'Margin', type: 'text', name: 'margin', value: tableStyles.margin ? String(tableStyles.margin) : '' },
//         { label: 'Border Collapse', type: 'text', name: 'borderCollapse', value: tableStyles.borderCollapse ? String(tableStyles.borderCollapse) : '' },
//     ], [tableStyles]);

//     const captionStyleOptions = useMemo(() => [
//         { label: 'Color', type: 'text', name: 'color', value: captionStyles.color ? String(captionStyles.color) : '' },
//         { label: 'Font Size', type: 'text', name: 'fontSize', value: captionStyles.fontSize ? String(captionStyles.fontSize) : '' },
//         { label: 'Font Weight', type: 'text', name: 'fontWeight', value: captionStyles.fontWeight ? String(captionStyles.fontWeight) : '' },
//         { label: 'Text Align', type: 'text', name: 'textAlign', value: captionStyles.textAlign ? String(captionStyles.textAlign) : '' },
//     ], [captionStyles]);

//     const cellStyleOptions = useMemo(() => [
//         { label: 'Border', type: 'text', name: 'border', value: cellStyles.border ? String(cellStyles.border) : '' },
//         { label: 'Padding', type: 'text', name: 'padding', value: cellStyles.padding ? String(cellStyles.padding) : '' },
//         { label: 'Text Align', type: 'text', name: 'textAlign', value: cellStyles.textAlign ? String(cellStyles.textAlign) : '' },
//     ], [cellStyles]);



//     const [childrenData, setChildrenData] = useState<Record<string, { html: string, css: string }>>({});

//     const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
//         setTableData(prevData => {
//             const newData = [...prevData.data];
//             newData[rowIndex][colIndex] = value;
//             return { ...prevData, data: newData };
//         });
//     };

//     const handleChildUpdate = (childId: string, html: string, css: string) => {
//         setChildrenData(prevData => ({
//             ...prevData,
//             [childId]: { html, css }
//         }));
//     };

//     const handleChildRemove = (childId: string) => {
//         setChildrenData(prevData => {
//             const newData = { ...prevData };
//             delete newData[childId];
//             return newData;
//         });
//     };

//     useEffect(() => {
//         let mergedChildrenHTML = '';
//         let mergedChildrenCSS = '';
//         Object.values(childrenData).forEach(data => {
//             mergedChildrenHTML += data.html;
//             mergedChildrenCSS += data.css;
//         });

//         const tableRows = tableData.data.map((row, rowIndex) =>
//             `<tr>${row.map((cell, colIndex) => `<td><input type="text" value="${cell}" data-row="${rowIndex}" data-col="${colIndex}" /></td>`).join('')}</tr>`
//         ).join('');

//         const htmlString = `
//         <table class="${droppableTableid}">
//             <caption class="${droppableTableid}-caption">${tableCaption}</caption>
//             ${tableRows}
//             ${mergedChildrenHTML}
//         </table>`;

//         const cssString = `
//         .${droppableTableid} {
//           ${Object.entries(tableStyles)
//                 .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
//                 .join('\n  ')}
//         }
//         .${droppableTableid}-caption {
//           ${Object.entries(captionStyles)
//                 .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
//                 .join('\n  ')}
//         }
//         .${droppableTableid} td {
//           ${Object.entries(cellStyles)
//                 .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
//                 .join('\n  ')}
//         }
//         .${droppableTableid} input {
//           width: 100%;
//           border: none;
//           background: transparent;
//         }
//         ${mergedChildrenCSS}`;

//         onUpdate(droppableTableid, htmlString, cssString);
//     }, [tableStyles, captionStyles, cellStyles, childrenData, droppableTableid, onUpdate, tableCaption, tableData]);




//     const openContextMenu = (event: React.MouseEvent<HTMLTableElement>) => {
//         // if (event.target === event.currentTarget) {
//         event.preventDefault();
//         event.stopPropagation();

//         if (currentContextMenu) {
//             currentContextMenu.remove();
//         }

//         const contextMenu = document.createElement('div');
//         currentContextMenu = contextMenu;
//         contextMenu.className = 'contextMenu';

//         const removeButton = document.createElement('button');
//         removeButton.textContent = 'Remove';
//         removeButton.className = 'button';
//         removeButton.addEventListener('click', () => {
//             if (parentID === 'droppable') {
//                 dispatch(removeComponentName(childIndex));
//             }
//             else if (parentID.startsWith('droppableDiv-')) {
//                 dispatch(removeDivChild({ DivId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableSpan-')) {
//                 dispatch(removeSpanChild({ SpanId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppablesection-')) {
//                 dispatch(removeSectionChild({ SectionId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableHeader-')) {
//                 dispatch(removeHeaderChild({ HeaderId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableFooter-')) {
//                 dispatch(removeFooterChild({ FooterId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableMain-')) {
//                 dispatch(removeMainChild({ MainId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableArticle-')) {
//                 dispatch(removeArticleChild({ ArticleId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableAside-')) {
//                 dispatch(removeAsideChild({ AsideId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableNav-')) {
//                 dispatch(removeNavChild({ NavId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableUl-')) {
//                 dispatch(removeUlChild({ UlId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableOl-')) {
//                 dispatch(removeOlChild({ OlId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableDl-')) {
//                 dispatch(removeDlChild({ DlId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableFieldSet-')) {
//                 dispatch(removeFieldSetChild({ FieldSetId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableForm-')) {
//                 dispatch(removeFormChild({ FormId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableTable-')) {
//                 dispatch(removeTableChild({ TableId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableIFrame-')) {
//                 dispatch(removeIFrameChild({ IFrameId: parentID, componentIndex: childIndex }));
//             } else if (parentID.startsWith('droppableFigure-')) {
//                 dispatch(removeFigureChild({ FigureId: parentID, componentIndex: childIndex }));
//             }
//             contextMenu.remove();
//             onRemove(droppableTableid)
//             currentContextMenu = null;
//         });

//         const captionInput = document.createElement('input');
//         captionInput.type = 'text';
//         captionInput.placeholder = 'Enter table caption...';
//         captionInput.className = 'inputField';
//         captionInput.value = tableCaption;
//         captionInput.addEventListener('input', (e) => {
//             setTableCaption((e.target as HTMLInputElement).value);
//         });

//         const rowInput = document.createElement('input');
//         rowInput.type = 'number';
//         rowInput.placeholder = 'Number of rows';
//         rowInput.className = 'inputField';
//         rowInput.value = tableData.rows.toString();
//         rowInput.addEventListener('input', (e) => {
//             const newRows = parseInt((e.target as HTMLInputElement).value);
//             setTableData(prevData => {
//                 const newData = [...prevData.data];
//                 if (newRows > prevData.rows) {
//                     for (let i = prevData.rows; i < newRows; i++) {
//                         newData.push(new Array(prevData.columns).fill(''));
//                     }
//                 } else if (newRows < prevData.rows) {
//                     newData.splice(newRows);
//                 }
//                 return { ...prevData, rows: newRows, data: newData };
//             });
//         });

//         const columnInput = document.createElement('input');
//         columnInput.type = 'number';
//         columnInput.placeholder = 'Number of columns';
//         columnInput.className = 'inputField';
//         columnInput.value = tableData.columns.toString();
//         columnInput.addEventListener('input', (e) => {
//             const newColumns = parseInt((e.target as HTMLInputElement).value);
//             setTableData(prevData => {
//                 const newData = prevData.data.map(row => {
//                     if (newColumns > prevData.columns) {
//                         return [...row, ...new Array(newColumns - prevData.columns).fill('')];
//                     } else if (newColumns < prevData.columns) {
//                         return row.slice(0, newColumns);
//                     }
//                     return row;
//                 });
//                 return { ...prevData, columns: newColumns, data: newData };
//             });
//         });

//         const createStyleForm = (options: { label: string; type: string; name: string; value: string }[], setStyles: React.Dispatch<React.SetStateAction<React.CSSProperties>>) => {
//             const form = document.createElement('form');
//             form.className = 'style-form';

//             const searchInput = document.createElement('input');
//             searchInput.type = 'text';
//             searchInput.placeholder = 'Search styles...';
//             searchInput.className = 'inputField';
//             searchInput.value = searchTerm;
//             searchInput.addEventListener('input', (e) => {
//                 setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
//                 updateVisibleFields(form, options, (e.target as HTMLInputElement).value.toLowerCase());
//             });
//             form.appendChild(searchInput);

//             const fieldsContainer = document.createElement('div');
//             fieldsContainer.className = 'fields-container';
//             form.appendChild(fieldsContainer);

//             const updateVisibleFields = (form: HTMLFormElement, options: { label: string; type: string; name: string; value: string }[], searchTerm: string) => {
//                 const container = form.querySelector('.fields-container') as HTMLDivElement;
//                 container.innerHTML = '';

//                 options
//                     .filter(option => option.label.toLowerCase().includes(searchTerm))
//                     .forEach(option => {
//                         const fieldContainer = document.createElement('div');

//                         const label = document.createElement('label');
//                         label.textContent = option.label;
//                         label.htmlFor = option.name;

//                         const input = document.createElement('input');
//                         input.className = 'inputField';
//                         input.type = option.type;
//                         input.name = option.name;
//                         input.value = option.value;

//                         input.addEventListener('input', (e) => {
//                             const target = e.target as HTMLInputElement;
//                             const newValue = target.value;
//                             setStyles((prevStyles) => ({
//                                 ...prevStyles,
//                                 [option.name]: newValue
//                             }));
//                         });

//                         fieldContainer.appendChild(label);
//                         fieldContainer.appendChild(input);
//                         container.appendChild(fieldContainer);
//                     });
//             };

//             updateVisibleFields(form, options, '');

//             return form;
//         };

//         const tableStyleForm = createStyleForm(tableStyleOptions, setTableStyles);
//         const captionStyleForm = createStyleForm(captionStyleOptions, setCaptionStyles);
//         const cellStyleForm = createStyleForm(cellStyleOptions, setCellStyles);

//         contextMenu.appendChild(removeButton);
//         contextMenu.appendChild(captionInput);
//         contextMenu.appendChild(rowInput);
//         contextMenu.appendChild(columnInput);
//         contextMenu.appendChild(cellStyleForm);
//         contextMenu.appendChild(document.createElement('hr'));
//         contextMenu.appendChild(document.createTextNode('Table Styles'));
//         contextMenu.appendChild(tableStyleForm);
//         contextMenu.appendChild(document.createElement('hr'));
//         contextMenu.appendChild(document.createTextNode('Caption Styles'));
//         contextMenu.appendChild(captionStyleForm);

//         document.body.appendChild(contextMenu);

//         const posX = event.clientX;
//         const posY = event.clientY;

//         contextMenu.style.position = 'absolute';
//         contextMenu.style.top = `${posY}px`;
//         contextMenu.style.left = `${posX}px`;

//         const handleClickOutside = (e: MouseEvent) => {
//             if (!contextMenu.contains(e.target as Node)) {
//                 contextMenu.remove();
//                 document.removeEventListener('click', handleClickOutside);
//                 currentContextMenu = null;
//             }
//         };

//         document.addEventListener('click', handleClickOutside);
//         // }
//     }



//     const selectTableChildren = createSelector(
//         [(state: RootState) => state.tableChild, (_, droppableTableid: string) => droppableTableid],
//         (tableChild, droppableTableid) => tableChild[droppableTableid] || []
//     );
//     const tableChildren = useSelector((state: RootState) => selectTableChildren(state, droppableTableid));



//     const renderComponent = (name: string, index: number) => {
//         if (depth >= maxDepth) {
//             return (
//                 <div key={`${droppableTableid}-${index}`} style={{ padding: '10px', border: '1px dashed red' }}>
//                     Max nesting depth reached
//                 </div>
//             );
//         }
//         switch (name) {
//             case 'div':
//                 return (
//                     <DivComponent
//                         key={`${droppableTableid}-${index}`}
//                         childIndex={index}
//                         parentID={droppableTableid}
//                         depth={depth + 1}
//                         onUpdate={handleChildUpdate}
//                         onRemove={handleChildRemove}
//                     />
//                 );
//             case 'span':
//                 return <SpanComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'section':
//                 return <SectionComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1} maxDepth={maxDepth}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'header':
//                 return <HeaderComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'footer':
//                 return <FooterComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'main':
//                 return <MainComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'article':
//                 return <ArticleComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'aside':
//                 return <AsideComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'nav':
//                 return <NavComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'ul':
//                 return <UlComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'ol':
//                 return <OlComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'dl':
//                 return <DlComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'fieldset':
//                 return <FieldSetComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'form':
//                 return <FormComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'table':
//                 return <TableComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'iframe':
//                 return <IFrameComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             case 'figure':
//                 return <FigureComponent
//                     key={index}
//                     childIndex={index}
//                     parentID={droppableTableid}
//                     depth={depth + 1}
//                     onUpdate={handleChildUpdate}
//                     onRemove={handleChildRemove}
//                 />;
//             // Add cases for other components
//             default:
//                 return null; // Handle default case if necessary
//         }
//     };
//     return (
//         <table
//             title='Table'
//             className={droppableTableid}
//             style={combinedStyles}
//             ref={setTableNodeRef}
//             onClick={openContextMenu}
//         >
//             <caption style={captionStyles} onContextMenu={openContextMenu}>{tableCaption}</caption>
//             <tbody onContextMenu={openContextMenu}>
//                 {tableData.data.map((row, rowIndex) => (
//                     <tr key={rowIndex} onContextMenu={openContextMenu}>
//                         {row.map((cell, colIndex) => (
//                             <td key={colIndex} style={cellStyles} onContextMenu={openContextMenu}>
//                                 <input
//                                     type="text"
//                                     value={cell}
//                                     onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
//                                     style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
//                                     onContextMenu={(e) => e.stopPropagation()}
//                                 />
//                             </td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//             {tableChildren.map((name: string, index: number) => renderComponent(name, index))}
//         </table>
//     );
// };

// export default TableComponent;

























import React, { useEffect, useMemo, useState } from 'react';
import { removeComponentName } from '../../store/slices/componentNamesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
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
import UlComponent from './UlComponent ';
import DlComponent from './DlComponent ';
import OlComponent from './OlComponent ';

import FormComponent from './FormComponent ';
import ArticleComponent from './ArticleComponent';
import IFrameComponent from './IFrameComponent ';
import FigureComponent from './FigureComponent ';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import ParagraphComponent from './ParagraphComponent';

interface TableComponentProps {
    childIndex: number;
    parentID: string;
    onUpdate: (childId: string, html: string, css: string) => void;
    onRemove: (childId: string) => void;
    depth: number;
    maxDepth?: number;
}
interface TableData {
    rows: number;
    columns: number;
    data: CellData[][];
}

interface CellData {
    value: string;
    colspan: number;
    rowspan: number;
}

let currentContextMenu: HTMLDivElement | null = null;

const TableComponent: React.FC<TableComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1, onUpdate, onRemove }) => {

    const droppableTableid = `droppableTable-${parentID}-${childIndex}`;

    const { isOver, setNodeRef: setTableNodeRef } = useDroppable({
        id: droppableTableid,
    });

    const [tableStyles, setTableStyles] = useState<React.CSSProperties>({});
    const [captionStyles, setCaptionStyles] = useState<React.CSSProperties>({});

    const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);

    const handleCellClick = async (rowIndex: number, colIndex: number, event: React.MouseEvent) => {
        // event.stopPropagation();
        setSelectedCell({ rowIndex, colIndex });
        alert(`${rowIndex} ${colIndex} selected`)
        // openContextMenu
    };

    const [tableCaption, setTableCaption] = useState<string>('Table Caption');
    const [tableData, setTableData] = useState<TableData>({
        rows: 2,
        columns: 2,
        data: [
            [{ value: '', colspan: 1, rowspan: 1 }, { value: '', colspan: 1, rowspan: 1 }],
            [{ value: '', colspan: 1, rowspan: 1 }, { value: '', colspan: 1, rowspan: 1 }]
        ]
    });

    const [cellStyles, setCellStyles] = useState<React.CSSProperties>({
        border: '2px solid' // Set default border
    });

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const combinedStyles = {
        height: "10vh",
        border: '1px solid #555',
        backgroundColor: isOver ? '#C5CCD4' : tableStyles.backgroundColor,
        ...tableStyles,
    };

    const tableStyleOptions = useMemo(() => [
        { label: 'Border', type: 'text', name: 'border', value: tableStyles.border ? String(tableStyles.border) : '' },
        { label: 'Height', type: 'text', name: 'height', value: tableStyles.height ? String(tableStyles.height) : '' },
        { label: 'Width', type: 'text', name: 'width', value: tableStyles.width ? String(tableStyles.width) : '' },
        { label: 'Background Color', type: 'text', name: 'backgroundColor', value: tableStyles.backgroundColor ? String(tableStyles.backgroundColor) : '' },
        { label: 'Color', type: 'text', name: 'color', value: tableStyles.color ? String(tableStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: tableStyles.fontSize ? String(tableStyles.fontSize) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: tableStyles.padding ? String(tableStyles.padding) : '' },
        { label: 'Margin', type: 'text', name: 'margin', value: tableStyles.margin ? String(tableStyles.margin) : '' },
        { label: 'Border Collapse', type: 'text', name: 'borderCollapse', value: tableStyles.borderCollapse ? String(tableStyles.borderCollapse) : '' },
    ], [tableStyles]);

    const captionStyleOptions = useMemo(() => [
        { label: 'Color', type: 'text', name: 'color', value: captionStyles.color ? String(captionStyles.color) : '' },
        { label: 'Font Size', type: 'text', name: 'fontSize', value: captionStyles.fontSize ? String(captionStyles.fontSize) : '' },
        { label: 'Font Weight', type: 'text', name: 'fontWeight', value: captionStyles.fontWeight ? String(captionStyles.fontWeight) : '' },
        { label: 'Text Align', type: 'text', name: 'textAlign', value: captionStyles.textAlign ? String(captionStyles.textAlign) : '' },
    ], [captionStyles]);

    const cellStyleOptions = useMemo(() => [
        { label: 'Border', type: 'text', name: 'border', value: cellStyles.border ? String(cellStyles.border) : '' },
        { label: 'Padding', type: 'text', name: 'padding', value: cellStyles.padding ? String(cellStyles.padding) : '' },
        { label: 'Text Align', type: 'text', name: 'textAlign', value: cellStyles.textAlign ? String(cellStyles.textAlign) : '' },
    ], [cellStyles]);



    const [childrenData, setChildrenData] = useState<Record<string, { html: string, css: string }>>({});

    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        setTableData(prevData => {
            const newData = [...prevData.data];
            newData[rowIndex][colIndex] = { ...newData[rowIndex][colIndex], value };
            return { ...prevData, data: newData };
        });
    };


    const updateColSpan = (rowIndex: number, colIndex: number, colspan: number) => {
        setTableData(prevData => {
            const newData = [...prevData.data];
            const currentCell = newData[rowIndex][colIndex];
            const maxPossibleColspan = prevData.columns - colIndex;

            // Ensure the new colspan doesn't exceed the available columns
            const newColspan = Math.min(colspan, maxPossibleColspan);

            // Update the current cell's colspan
            newData[rowIndex][colIndex] = { ...currentCell, colspan: newColspan };

            // Remove or adjust cells that are now covered by the new colspan
            const cellsToRemove = newColspan - currentCell.colspan;
            if (cellsToRemove > 0) {
                newData[rowIndex].splice(colIndex + 1, cellsToRemove);
            }

            return { ...prevData, data: newData };
        });
    };

    const updateRowSpan = (rowIndex: number, colIndex: number, rowspan: number) => {
        setTableData(prevData => {
            const newData = [...prevData.data];
            const currentCell = newData[rowIndex][colIndex];
            const maxPossibleRowspan = prevData.rows - rowIndex;

            // Ensure the new rowspan doesn't exceed the available rows
            const newRowspan = Math.min(rowspan, maxPossibleRowspan);

            // Update the current cell's rowspan
            newData[rowIndex][colIndex] = { ...currentCell, rowspan: newRowspan };

            // Remove or adjust cells that are now covered by the new rowspan
            for (let i = 1; i < newRowspan; i++) {
                if (newData[rowIndex + i]) {
                    newData[rowIndex + i].splice(colIndex, 1);
                }
            }

            return { ...prevData, data: newData };
        });
    };

    const handleChildUpdate = (childId: string, html: string, css: string) => {
        setChildrenData(prevData => ({
            ...prevData,
            [childId]: { html, css }
        }));
    };

    const handleChildRemove = (childId: string) => {
        setChildrenData(prevData => {
            const newData = { ...prevData };
            delete newData[childId];
            return newData;
        });
    };

    useEffect(() => {
        let mergedChildrenHTML = '';
        let mergedChildrenCSS = '';
        Object.values(childrenData).forEach(data => {
            mergedChildrenHTML += data.html;
            mergedChildrenCSS += data.css;
        });

        const tableRows = tableData.data.map((row, rowIndex) =>
            `<tr>${row.map((cell, colIndex) =>
                `<td colspan="${cell.colspan}" rowspan="${cell.rowspan}">
                    ${cell.value}
                </td>`
            ).join('')}</tr>`
        ).join('');

        const htmlString = `
        <table class="${droppableTableid}">
            <caption class="${droppableTableid}-caption">${tableCaption}</caption>
            ${tableRows}
            ${mergedChildrenHTML}
        </table>`;


        const cssString = `
        .${droppableTableid} {
          ${Object.entries(tableStyles)
                .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n  ')}
        }
        .${droppableTableid}-caption {
          ${Object.entries(captionStyles)
                .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n  ')}
        }
        .${droppableTableid} td {
          ${Object.entries(cellStyles)
                .map(([key, value]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value};`)
                .join('\n  ')}
        }
        .${droppableTableid} input {
          width: 100%;
          border: none;
          background: transparent;
        }
        ${mergedChildrenCSS}`;

        onUpdate(droppableTableid, htmlString, cssString);
    }, [tableStyles, captionStyles, cellStyles, childrenData, droppableTableid, onUpdate, tableCaption, tableData]);




    const openContextMenu = (event: React.MouseEvent<HTMLTableCellElement | HTMLTableElement | HTMLInputElement>) => {
        event.preventDefault();
        // event.stopPropagation();

        if (currentContextMenu) {
            currentContextMenu.remove();
        }

        const contextMenu = document.createElement('div');
        currentContextMenu = contextMenu;
        contextMenu.className = 'contextMenu';
        contextMenu.style.cursor = 'move';

        // Add draggable functionality
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            offsetX = e.clientX - contextMenu.getBoundingClientRect().left;
            offsetY = e.clientY - contextMenu.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                contextMenu.style.left = `${e.clientX - offsetX}px`;
                contextMenu.style.top = `${e.clientY - offsetY}px`;
            }
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        contextMenu.addEventListener('mousedown', onMouseDown);

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
            onRemove(droppableTableid)
            currentContextMenu = null;
        });

        const captionInput = document.createElement('input');
        captionInput.type = 'text';
        captionInput.placeholder = 'Enter table caption...';
        captionInput.className = 'inputField';
        captionInput.value = tableCaption;
        captionInput.addEventListener('input', (e) => {
            setTableCaption((e.target as HTMLInputElement).value);
        });

        const rowInput = document.createElement('input');
        rowInput.type = 'number';
        rowInput.placeholder = 'Number of rows';
        rowInput.className = 'inputField';
        rowInput.value = tableData.rows.toString();
        rowInput.addEventListener('input', (e) => {
            const newRows = parseInt((e.target as HTMLInputElement).value);
            setTableData(prevData => {
                const newData = [...prevData.data];
                if (newRows > prevData.rows) {
                    for (let i = prevData.rows; i < newRows; i++) {
                        newData.push(new Array(prevData.columns).fill(''));
                    }
                } else if (newRows < prevData.rows) {
                    newData.splice(newRows);
                }
                return { ...prevData, rows: newRows, data: newData };
            });
        });

        const columnInput = document.createElement('input');
        columnInput.type = 'number';
        columnInput.placeholder = 'Number of columns';
        columnInput.className = 'inputField';
        columnInput.value = tableData.columns.toString();
        columnInput.addEventListener('input', (e) => {
            const newColumns = parseInt((e.target as HTMLInputElement).value);
            setTableData(prevData => {
                const newData = prevData.data.map(row => {
                    if (newColumns > prevData.columns) {
                        return [...row, ...new Array(newColumns - prevData.columns).fill('')];
                    } else if (newColumns < prevData.columns) {
                        return row.slice(0, newColumns);
                    }
                    return row;
                });
                return { ...prevData, columns: newColumns, data: newData };
            });
        });



        if (selectedCell) {
            const { rowIndex, colIndex } = selectedCell;
            const currentCell = tableData.data[rowIndex][colIndex];

            const colspanInput = document.createElement('input');
            colspanInput.type = 'number';
            colspanInput.min = '1';
            colspanInput.placeholder = 'Colspan';
            colspanInput.className = 'inputField';
            colspanInput.value = currentCell.colspan.toString();
            colspanInput.addEventListener('input', (e) => {
                const newColspan = parseInt((e.target as HTMLInputElement).value);
                updateColSpan(rowIndex, colIndex, newColspan);
            });

            const rowspanInput = document.createElement('input');
            rowspanInput.type = 'number';
            rowspanInput.min = '1';
            rowspanInput.placeholder = 'Rowspan';
            rowspanInput.className = 'inputField';
            rowspanInput.value = currentCell.rowspan.toString();
            rowspanInput.addEventListener('input', (e) => {
                const newRowspan = parseInt((e.target as HTMLInputElement).value);
                updateRowSpan(rowIndex, colIndex, newRowspan);
            });

            contextMenu.appendChild(colspanInput);
            contextMenu.appendChild(rowspanInput);
        } else {
            const noSelectionText = document.createElement('p');
            noSelectionText.textContent = 'Please select a cell to modify colspan and rowspan.';
            contextMenu.appendChild(noSelectionText);
        }


        const createStyleForm = (options: { label: string; type: string; name: string; value: string }[], setStyles: React.Dispatch<React.SetStateAction<React.CSSProperties>>) => {
            const form = document.createElement('form');
            form.className = 'style-form';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search styles...';
            searchInput.className = 'inputField';
            searchInput.value = searchTerm;
            searchInput.addEventListener('input', (e) => {
                setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
                updateVisibleFields(form, options, (e.target as HTMLInputElement).value.toLowerCase());
            });
            form.appendChild(searchInput);

            const fieldsContainer = document.createElement('div');
            fieldsContainer.className = 'fields-container';
            form.appendChild(fieldsContainer);

            const updateVisibleFields = (form: HTMLFormElement, options: { label: string; type: string; name: string; value: string }[], searchTerm: string) => {
                const container = form.querySelector('.fields-container') as HTMLDivElement;
                container.innerHTML = '';

                options
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
                        input.value = option.value;

                        input.addEventListener('input', (e) => {
                            const target = e.target as HTMLInputElement;
                            const newValue = target.value;
                            setStyles((prevStyles) => ({
                                ...prevStyles,
                                [option.name]: newValue
                            }));
                        });

                        fieldContainer.appendChild(label);
                        fieldContainer.appendChild(input);
                        container.appendChild(fieldContainer);
                    });
            };

            updateVisibleFields(form, options, '');

            return form;
        };

        const tableStyleForm = createStyleForm(tableStyleOptions, setTableStyles);
        const captionStyleForm = createStyleForm(captionStyleOptions, setCaptionStyles);
        const cellStyleForm = createStyleForm(cellStyleOptions, setCellStyles);

        contextMenu.appendChild(removeButton);
        contextMenu.appendChild(captionInput);
        contextMenu.appendChild(rowInput);
        contextMenu.appendChild(columnInput);
        // contextMenu.appendChild(colspanInput);
        // contextMenu.appendChild(rowspanInput);
        contextMenu.appendChild(cellStyleForm);
        contextMenu.appendChild(document.createElement('hr'));
        contextMenu.appendChild(document.createTextNode('Table Styles'));
        contextMenu.appendChild(tableStyleForm);
        contextMenu.appendChild(document.createElement('hr'));
        contextMenu.appendChild(document.createTextNode('Caption Styles'));
        contextMenu.appendChild(captionStyleForm);

        document.body.appendChild(contextMenu);

        // Set initial position
        const posX = event.clientX;
        const posY = event.clientY;

        contextMenu.style.position = 'absolute';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;

        // Hide context menu when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            if (!contextMenu.contains(e.target as Node)) {
                contextMenu.remove();
                document.removeEventListener('click', handleClickOutside);
                currentContextMenu = null;
            }
        };

        document.addEventListener('click', handleClickOutside);
    };



    const selectTableChildren = createSelector(
        [(state: RootState) => state.tableChild, (_, droppableTableid: string) => droppableTableid],
        (tableChild, droppableTableid) => tableChild[droppableTableid] || []
    );
    const tableChildren = useSelector((state: RootState) => selectTableChildren(state, droppableTableid));



    const renderComponent = (name: string, index: number) => {
        if (depth >= maxDepth) {
            return (
                <div key={`${droppableTableid}-${index}`} style={{ padding: '10px', border: '1px dashed red' }}>
                    Max nesting depth reached
                </div>
            );
        }
        switch (name) {
            case 'div':
                return (
                    <DivComponent
                        key={`${droppableTableid}-${index}`}
                        childIndex={index}
                        parentID={droppableTableid}
                        depth={depth + 1}
                        onUpdate={handleChildUpdate}
                        onRemove={handleChildRemove}
                    />
                );
            case 'span':
                return <SpanComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'section':
                return <SectionComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1} maxDepth={maxDepth}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'header':
                return <HeaderComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'footer':
                return <FooterComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'main':
                return <MainComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'article':
                return <ArticleComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'img':
                return <ImageComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'video':
                return <VideoComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'audio':
                return <AudioComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'aside':
                return <AsideComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'nav':
                return <NavComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'paragraph':
                return <ParagraphComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'ul':
                return <UlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'ol':
                return <OlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'dl':
                return <DlComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;

            case 'form':
                return <FormComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            // case 'table':
            //     return <TableComponent
            //         key={index}
            //         childIndex={index}
            //         parentID={droppableTableid}
            //         depth={depth + 1}
            //         onUpdate={handleChildUpdate}
            //         onRemove={handleChildRemove}
            //     />;
            case 'iframe':
                return <IFrameComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
                    depth={depth + 1}
                    onUpdate={handleChildUpdate}
                    onRemove={handleChildRemove}
                />;
            case 'figure':
                return <FigureComponent
                    key={index}
                    childIndex={index}
                    parentID={droppableTableid}
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
        <table
            title='Table'
            className={droppableTableid}
            style={combinedStyles}
            ref={setTableNodeRef}
        // onContextMenu={openContextMenu}
        >
            <caption style={captionStyles} onContextMenu={openContextMenu}>{tableCaption}</caption>
            <tbody>
                {tableData.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                style={cellStyles}
                                onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                                // onContextMenu={openContextMenu}
                                // onContextMenu={(e) => { handleCellClick(rowIndex, colIndex, e) }}
                                colSpan={cell.colspan}
                                rowSpan={cell.rowspan}
                            >
                                <input
                                    type="text"
                                    value={cell.value}
                                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                    style={{ width: 'fit-content', height: 'auto', border: 'none', background: 'transparent' }}
                                // onContextMenu={(e) => {
                                //     e.stopPropagation();
                                //     openContextMenu(e);
                                // }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            {tableChildren.map((name: string, index: number) => renderComponent(name, index))}
        </table >
    );
}


export default TableComponent;