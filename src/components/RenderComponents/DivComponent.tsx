// import React, { useState, useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './ContextMenu.css';
// import { removeComponentName } from '../../store/componentNamesSlice';
// import { useDroppable } from '@dnd-kit/core';
// import { RootState } from '../../store/store';
// import SpanComponent from './SpanComponent ';
// import SectionComponent from './SectionComponent ';
// import HeaderComponent from './HeaderComponent ';
// import FooterComponent from './FooterComponent ';
// import MainComponent from './MainComponent ';
// import FigureComponent from './FigureComponent ';
// import IFrameComponent from './IFrameComponent ';
// import TableComponent from './TableComponent ';
// import FormComponent from './FormComponent ';
// import FieldSetComponent from './FieldSetComponent ';
// import DlComponent from './DlComponent ';
// import OlComponent from './OlComponent ';
// import UlComponent from './UlComponent ';
// import NavComponent from './NavComponent ';
// import AsideComponent from './AsideComponent ';
// import ArticleComponent from './ArticaleComponent ';
// import { removeDivChild } from '../../store/divChildListSlice';
// import { createSelector } from '@reduxjs/toolkit';



// interface DivComponentProps {
//   childIndex: number;
//   parentID: string;
// }

// let currentContextMenu: HTMLDivElement | null = null;

// const DivComponent: React.FC<DivComponentProps> = ({ childIndex, parentID }) => {

//   const droppableDivid = `droppableDiv-${childIndex}`;
//   const { isOver, setNodeRef: setDivNodeRef } = useDroppable({
//     id: droppableDivid,
//   });

//   const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({
//     border: '2px solid red',
//   });

//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const combinedStyles = {
//     ...baseStyles,
//     backgroundColor: isOver ? '#C5CCD4' : baseStyles.backgroundColor,
//   };

//   const styleOptions = useMemo(() => [
//     { label: 'Border', type: 'text', name: 'border', value: baseStyles.border ? String(baseStyles.border) : '' },
//     { label: 'Height', type: 'text', name: 'height', value: baseStyles.height ? String(baseStyles.height) : '' },
//     { label: 'Width', type: 'text', name: 'width', value: baseStyles.width ? String(baseStyles.width) : '' },
//     { label: 'Background Color', type: 'text', name: 'backgroundColor', value: baseStyles.backgroundColor ? String(baseStyles.backgroundColor) : '' },
//     { label: 'Color', type: 'text', name: 'color', value: baseStyles.color ? String(baseStyles.color) : '' },
//     { label: 'Font Size', type: 'text', name: 'fontSize', value: baseStyles.fontSize ? String(baseStyles.fontSize) : '' },
//     { label: 'Padding', type: 'text', name: 'padding', value: baseStyles.padding ? String(baseStyles.padding) : '' },
//     { label: 'Padding Left', type: 'text', name: 'paddingLeft', value: baseStyles.paddingLeft ? String(baseStyles.paddingLeft) : '' },
//     { label: 'Padding Top', type: 'text', name: 'paddingTop', value: baseStyles.paddingTop ? String(baseStyles.paddingTop) : '' },
//     { label: 'Padding Right', type: 'text', name: 'paddingRight', value: baseStyles.paddingRight ? String(baseStyles.paddingRight) : '' },
//     { label: 'Padding Bottom', type: 'text', name: 'paddingBottom', value: baseStyles.paddingBottom ? String(baseStyles.paddingBottom) : '' },
//     { label: 'Margin', type: 'text', name: 'margin', value: baseStyles.margin ? String(baseStyles.margin) : '' },
//     { label: 'Margin Left', type: 'text', name: 'marginLeft', value: baseStyles.marginLeft ? String(baseStyles.marginLeft) : '' },
//     { label: 'Margin Top', type: 'text', name: 'marginTop', value: baseStyles.marginTop ? String(baseStyles.marginTop) : '' },
//     { label: 'Margin Right', type: 'text', name: 'marginRight', value: baseStyles.marginRight ? String(baseStyles.marginRight) : '' },
//     { label: 'Margin Bottom', type: 'text', name: 'marginBottom', value: baseStyles.marginBottom ? String(baseStyles.marginBottom) : '' },
//     { label: 'Box Shadow', type: 'text', name: 'boxShadow', value: baseStyles.boxShadow ? String(baseStyles.boxShadow) : '' },
//     { label: 'Border Radius', type: 'text', name: 'borderRadius', value: baseStyles.borderRadius ? String(baseStyles.borderRadius) : '' },
//     { label: 'Text Align', type: 'text', name: 'textAlign', value: baseStyles.textAlign ? String(baseStyles.textAlign) : '' },
//     { label: 'Display', type: 'text', name: 'display', value: baseStyles.display ? String(baseStyles.display) : '' },
//     { label: 'Flex Direction', type: 'text', name: 'flexDirection', value: baseStyles.flexDirection ? String(baseStyles.flexDirection) : '' },
//     { label: 'Justify Content', type: 'text', name: 'justifyContent', value: baseStyles.justifyContent ? String(baseStyles.justifyContent) : '' },
//     { label: 'Align Items', type: 'text', name: 'alignItems', value: baseStyles.alignItems ? String(baseStyles.alignItems) : '' },
//     { label: 'Gap', type: 'text', name: 'gap', value: baseStyles.gap ? String(baseStyles.gap) : '' },
//   ], [baseStyles]);

//   const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       event.preventDefault();
//       event.stopPropagation();

//       if (currentContextMenu) {
//         currentContextMenu.remove();
//       }

//       const contextMenu = document.createElement('div');
//       currentContextMenu = contextMenu;
//       contextMenu.className = 'contextMenu';

//       const removeButton = document.createElement('button');
//       removeButton.textContent = 'Remove';
//       removeButton.className = 'button';
//       removeButton.addEventListener('click', () => {
//         if (parentID === 'droppable') {
//           dispatch(removeComponentName(childIndex));
//         }
//         else if (parentID === `droppableDiv-${1}`) {
//           // removeDivChild(divIndex)
//         }
//         contextMenu.remove();
//         currentContextMenu = null;
//       });

//       const styleForm = document.createElement('form');
//       styleForm.className = 'style-form';

//       const searchInput = document.createElement('input');
//       searchInput.type = 'text';
//       searchInput.placeholder = 'Search styles...';
//       searchInput.className = 'inputField';
//       searchInput.value = searchTerm;
//       searchInput.addEventListener('input', (e) => {
//         setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
//       });

//       const createInputField = (labelText: string, inputType: string, name: string, value: string | undefined) => {
//         const fieldContainer = document.createElement('div');

//         const label = document.createElement('label');
//         label.textContent = labelText;
//         label.htmlFor = name;

//         const input = document.createElement('input');
//         input.className = 'inputField';
//         input.type = inputType;
//         input.name = name;
//         input.value = value || '';

//         input.addEventListener('input', (e) => {
//           const target = e.target as HTMLInputElement;
//           const newValue = target.value;
//           setBaseStyles((prevStyles) => ({
//             ...prevStyles,
//             [name]: newValue
//           }));
//         });

//         fieldContainer.appendChild(label);
//         fieldContainer.appendChild(input);
//         styleForm.appendChild(fieldContainer);
//       };

//       styleOptions
//         .filter(option => option.label.toLowerCase().includes(searchTerm))
//         .forEach(option => createInputField(option.label, option.type, option.name, option.value));

//       contextMenu.appendChild(removeButton);
//       contextMenu.appendChild(searchInput);
//       contextMenu.appendChild(styleForm);
//       document.body.appendChild(contextMenu);

//       const posX = event.clientX;
//       const posY = event.clientY;

//       contextMenu.style.position = 'absolute';
//       contextMenu.style.top = `${posY}px`;
//       contextMenu.style.left = `${posX}px`;

//       const handleClickOutside = (e: MouseEvent) => {
//         if (!contextMenu.contains(e.target as Node)) {
//           contextMenu.remove();
//           document.removeEventListener('click', handleClickOutside);
//           currentContextMenu = null;
//         }
//       };

//       document.addEventListener('click', handleClickOutside);
//     }
//   }
//   useEffect(() => {
//     if (currentContextMenu) {
//       const styleForm = currentContextMenu.querySelector('.style-form');
//       if (styleForm) {
//         while (styleForm.firstChild) {
//           styleForm.removeChild(styleForm.firstChild);
//         }
//         const searchInput = document.createElement('input');
//         searchInput.type = 'text';
//         searchInput.placeholder = 'Search styles...';
//         searchInput.className = 'inputField';
//         searchInput.value = searchTerm;
//         searchInput.addEventListener('input', (e) => {
//           setSearchTerm((e.target as HTMLInputElement).value.toLowerCase());
//         });
//         styleOptions
//           .filter(option => option.label.toLowerCase().includes(searchTerm))
//           .forEach(option => {
//             const fieldContainer = document.createElement('div');

//             const label = document.createElement('label');
//             label.textContent = option.label;
//             label.htmlFor = option.name;

//             const input = document.createElement('input');
//             input.className = 'inputField';
//             input.type = option.type;
//             input.name = option.name;
//             input.value = option.value || '';

//             input.addEventListener('input', (e) => {
//               const target = e.target as HTMLInputElement;
//               const newValue = target.value;
//               setBaseStyles((prevStyles) => ({
//                 ...prevStyles,
//                 [option.name]: newValue
//               }));
//             });

//             fieldContainer.appendChild(label);
//             fieldContainer.appendChild(input);
//             styleForm.appendChild(fieldContainer);
//           });
//       }
//     }
//   }, [searchTerm]);



//   const selectDivChildren = createSelector(
//     [(state: RootState) => state.divChild, (_, droppableDivid: string) => droppableDivid],
//     (divChild, droppableDivid) => divChild[droppableDivid] || []
//   );
//   const divChildren = useSelector((state: RootState) => selectDivChildren(state, droppableDivid));




//   const renderComponent = (name: string, index: number) => {
//     switch (name) {
//       // case 'div':
//       //   return <DivComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'span':
//         return <SpanComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'section':
//         return <SectionComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'header':
//         return <HeaderComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'footer':
//         return <FooterComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'main':
//         return <MainComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'article':
//         return <ArticleComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'aside':
//         return <AsideComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       case 'nav':
//         return <NavComponent key={index} childIndex={index} parentID={droppableDivid} />;
//       // case 'ul':
//       //   return <UlComponent key={divIndex} divIndex={divIndex} />;
//       // case 'ol':
//       //   return <OlComponent key={divIndex} divIndex={divIndex} />;
//       // case 'dl':
//       //   return <DlComponent key={divIndex} divIndex={divIndex} />;
//       // case 'fieldset':
//       //   return <FieldSetComponent key={divIndex} divIndex={divIndex} />;
//       // case 'form':
//       //   return <FormComponent key={divIndex} divIndex={divIndex} />;
//       // case 'table':
//       //   return <TableComponent key={divIndex} divIndex={divIndex} />;
//       // case 'iframe':
//       //   return <IFrameComponent key={divIndex} divIndex={divIndex} />;
//       // case 'figure':
//       //   return <FigureComponent key={divIndex} divIndex={divIndex} />;
//       // Add cases for other components
//       default:
//         return null; // Handle default case if necessary
//     }
//   };


//   return (
//     <div ref={setDivNodeRef} id={`div-${childIndex}`} className={`div-component-${childIndex}`} style={combinedStyles} onContextMenu={openContextMenu}>
//       {`Div : \n  Child index: ${childIndex} \n parent id = ${parentID}`}

//       {divChildren.map((name: string, index: number) => renderComponent(name, index))}



//     </div>
//   );
// };

// export default DivComponent;








import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ContextMenu.css';
import { removeComponentName } from '../../store/componentNamesSlice';
import { useDroppable } from '@dnd-kit/core';
import { RootState } from '../../store/store';
import SpanComponent from './SpanComponent ';
import SectionComponent from './SectionComponent ';
import HeaderComponent from './HeaderComponent ';
import FooterComponent from './FooterComponent ';
import MainComponent from './MainComponent ';
import FigureComponent from './FigureComponent ';
import IFrameComponent from './IFrameComponent ';
import TableComponent from './TableComponent ';
import FormComponent from './FormComponent ';
import FieldSetComponent from './FieldSetComponent ';
import DlComponent from './DlComponent ';
import OlComponent from './OlComponent ';
import UlComponent from './UlComponent ';
import NavComponent from './NavComponent ';
import AsideComponent from './AsideComponent ';
import ArticleComponent from './ArticaleComponent ';
import { removeDivChild } from '../../store/divChildListSlice';
import { createSelector } from '@reduxjs/toolkit';



interface DivComponentProps {
  childIndex: number;
  parentID: string;
  depth: number;
  maxDepth?: number;
}

let currentContextMenu: HTMLDivElement | null = null;

const DivComponent: React.FC<DivComponentProps> = ({ childIndex, parentID, depth, maxDepth = 1 }) => {

  const droppableDivid = `droppableDiv-${parentID}-${childIndex}`;
  const { isOver, setNodeRef: setDivNodeRef } = useDroppable({
    id: droppableDivid,
  });

  const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({
    border: '2px solid red',
  });

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const combinedStyles = {
    ...baseStyles,
    backgroundColor: isOver ? '#C5CCD4' : baseStyles.backgroundColor,
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

  const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
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
          dispatch(removeComponentName(childIndex));
        }
        else if (parentID === `droppableDiv-${1}`) {
          // removeDivChild(divIndex)
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



  const selectDivChildren = createSelector(
    [(state: RootState) => state.divChild, (_, droppableDivid: string) => droppableDivid],
    (divChild, droppableDivid) => divChild[droppableDivid] || []
  );
  const divChildren = useSelector((state: RootState) => selectDivChildren(state, droppableDivid));




  const renderComponent = (name: string, index: number) => {
    if (depth >= maxDepth) {
      return (
        <div key={`${droppableDivid}-${index}`} style={{ padding: '10px', border: '1px dashed red' }}>
          Max nesting depth reached
        </div>
      );
    }
    switch (name) {
      // case 'div':
      //   return <DivComponent key={index} childIndex={index} parentID={droppableDivid} />;

      case 'div':
        return (
          <DivComponent
            key={`${droppableDivid}-${index}`}
            childIndex={index}
            parentID={droppableDivid}
            depth={depth + 1}
            maxDepth={maxDepth}
          />
        );
      case 'span':
        return <SpanComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'section':
        return <SectionComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'header':
        return <HeaderComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'footer':
        return <FooterComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'main':
        return <MainComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'article':
        return <ArticleComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'aside':
        return <AsideComponent key={index} childIndex={index} parentID={droppableDivid} />;
      case 'nav':
        return <NavComponent key={index} childIndex={index} parentID={droppableDivid} />;
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
    <div ref={setDivNodeRef} id={`div-${childIndex}`} className={`div-component-${childIndex}`} style={combinedStyles} onContextMenu={openContextMenu}>
      {`Div : \n  Child index: ${childIndex} \n parent id = ${parentID}`}

      {divChildren.map((name: string, index: number) => renderComponent(name, index))}



    </div>
  );
};

export default DivComponent;
