// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

// interface ComponentStyle {
//     [key: string]: { [key: string]: string };
// }

// const CodeGenerator: React.FC = () => {
//     const componentNames = useSelector((state: RootState) => state.componentNames.names);
//     const [componentStyles, setComponentStyles] = useState<ComponentStyle>({});
//     const [generatedHTML, setGeneratedHTML] = useState<string>('');
//     const [generatedCSS, setGeneratedCSS] = useState<string>('');

//     const collectStyles = () => {
//         const styles: ComponentStyle = {};
//         const classPrefixes = Object.values(componentNames).map(name => `droppable${name.charAt(0).toUpperCase() + name.slice(1)}-`);
//         const selector = classPrefixes.map(prefix => `[class^="${prefix}"]`).join(', ');

//         const elements = document.querySelectorAll(selector);

//         elements.forEach((el) => {
//             const className = el.className;
//             const styleObject: { [key: string]: string } = {};

//             // Access the React component instance
//             const reactInstance = (el as any)[Object.keys(el).find(key => key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$'))!];

//             if (reactInstance && reactInstance.memoizedProps && reactInstance.memoizedProps.style) {
//                 const combinedStyles = reactInstance.memoizedProps.style;

//                 // Extract styles from combinedStyles
//                 Object.entries(combinedStyles).forEach(([key, value]) => {
//                     if (typeof value === 'string' || typeof value === 'number') {
//                         // Convert camelCase to kebab-case
//                         const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
//                         styleObject[cssKey] = String(value);
//                     }
//                 });
//             }

//             styles[className] = styleObject;
//         });

//         setComponentStyles(styles);
//         setGeneratedHTML(generateHTML(styles));
//         setGeneratedCSS(generateCSS(styles));
//     };

//     const generateHTML = (styles: ComponentStyle) => {
//         let html = `<!DOCTYPE html>
//         <html lang="en">
//          <head>
//          <meta charset="UTF-8">
//          <meta name="viewport" content="width=device-width, initial-scale=1.0">
//          <link rel="stylesheet" href="style.css">
//          <title>Document</title>
//          </head>
//          <body>\n`;

//         Object.entries(styles).forEach(([className]) => {
//             const componentName = className.split('-')[0].replace('droppable', '').toLowerCase(); // Extract component name from className
//             html += `  <${componentName} class="${className}"></${componentName}>\n`;
//         });

//         html += `</body>\n</html>`;
//         return html;
//     };

//     const generateCSS = (styles: ComponentStyle) => {
//         let css = '';
//         Object.entries(styles).forEach(([className, style]) => {
//             css += `.${className} {\n`;
//             Object.entries(style).forEach(([property, value]) => {
//                 css += `  ${property}: ${value};\n`;
//             });
//             css += '}\n\n';
//         });
//         return css;
//     };

//     const copyToClipboard = (text: string) => {
//         navigator.clipboard.writeText(text).then(
//             () => alert('Copied to clipboard!'),
//             () => alert('Failed to copy!')
//         );
//     };

//     const clearGeneratedCode = () => {
//         setGeneratedHTML('');
//         setGeneratedCSS('');
//     };

//     return (
//         <div>
//             <h2>Generated HTML</h2>
//             <button className="button" onClick={collectStyles}>Generate</button>
//             <pre>{generatedHTML}</pre>
//             <button className='button' onClick={() => copyToClipboard(generatedHTML)}>Copy HTML</button>
//             <h2>Generated CSS</h2>
//             <pre>{generatedCSS}</pre>
//             <button className="button" onClick={() => copyToClipboard(generatedCSS)}>Copy CSS</button>
//             <button className='button' onClick={clearGeneratedCode}>Clear</button>
//         </div>
//     );
// };

// export default CodeGenerator;








import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ComponentStyle {
    [key: string]: { [key: string]: string };
}

const CodeGenerator: React.FC = () => {
    const componentNames = useSelector((state: RootState) => state.componentNames.names);
    const allChildStates = useSelector((state: RootState) => ({
        divChild: state.divChild,
        spanChild: state.spanChild,
        sectionChild: state.sectionChild,
        headerChild: state.headerChild,
        footerChild: state.footerChild,
        mainChild: state.mainChild,
        articleChild: state.articleChild,
        asideChild: state.asideChild,
        navChild: state.navChild,
        ulChild: state.ulChild,
        olChild: state.olChild,
        dlChild: state.dlChild,
        fieldSetChild: state.fieldSetChild,
        formChild: state.formChild,
        tableChild: state.tableChild,
        iFrameChild: state.iFrameChild,
        figureChild: state.figureChild,
    }));

    const [componentStyles, setComponentStyles] = useState<ComponentStyle>({});
    const [generatedHTML, setGeneratedHTML] = useState<string>('');
    const [generatedCSS, setGeneratedCSS] = useState<string>('');
    const [debugLog, setDebugLog] = useState<string>('');

    const collectStyles = () => {
        const styles: ComponentStyle = {};
        const classPrefixes = Object.values(componentNames).map(name => `droppable${name.charAt(0).toUpperCase() + name.slice(1)}-`);
        const selector = classPrefixes.map(prefix => `[class^="${prefix}"]`).join(', ');

        const elements = document.querySelectorAll(selector);

        elements.forEach((el) => {
            const className = el.className;
            const styleObject: { [key: string]: string } = {};

            const reactInstance = (el as any)[Object.keys(el).find(key => key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$'))!];

            if (reactInstance && reactInstance.memoizedProps && reactInstance.memoizedProps.style) {
                const combinedStyles = reactInstance.memoizedProps.style;

                Object.entries(combinedStyles).forEach(([key, value]) => {
                    if (typeof value === 'string' || typeof value === 'number') {
                        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                        styleObject[cssKey] = String(value);
                    }
                });
            }

            styles[className] = styleObject;
        });

        setComponentStyles(styles);
        const { html, css, log } = generateCode(componentNames, styles, allChildStates);
        setGeneratedHTML(html);
        setGeneratedCSS(css);
        setDebugLog(log);
    };

    const generateCode = (
        components: { [key: number]: string },
        styles: ComponentStyle,
        childStates: Record<string, Record<string, string[]>>
    ) => {
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Generated Page</title>
</head>
<body>\n`;

        let css = '';
        let log = 'Debug Log:\n';

        const generateComponentCode = (componentName: string, parentId: string = 'droppable', index: number = 0, indent: string = ''): string => {
            const componentId = `${parentId}-${index}`;
            const className = `droppable${componentName.charAt(0).toUpperCase() + componentName.slice(1)}-${componentId}`;

            log += `${indent}Generating component: ${componentName} (ID: ${componentId})\n`;

            let componentHtml = `${indent}<${componentName} class="${className}">\n`;

            // Generate CSS for this component
            if (styles[className]) {
                css += `.${className} {\n`;
                Object.entries(styles[className]).forEach(([property, value]) => {
                    css += `  ${property}: ${value};\n`;
                });
                css += '}\n\n';
            }

            // Recursively generate code for child components
            const childSliceKey = `${componentName.toLowerCase()}Child`;
            const childComponents = childStates[childSliceKey] && childStates[childSliceKey][componentId];

            log += `${indent}  Child components for ${componentId}: ${JSON.stringify(childComponents)}\n`;

            if (childComponents && childComponents.length > 0) {
                childComponents.forEach((childName: string, childIndex: number) => {
                    componentHtml += generateComponentCode(childName, componentId, childIndex, indent + '  ');
                });
            }

            componentHtml += `${indent}</${componentName}>\n`;
            return componentHtml;
        };

        log += `Top-level components: ${JSON.stringify(components)}\n`;
        log += `Child states: ${JSON.stringify(childStates)}\n`;

        Object.entries(components).forEach(([key, componentName]) => {
            html += generateComponentCode(componentName, 'droppable', parseInt(key), '  ');
        });

        html += '</body>\n</html>';

        return { html, css, log };
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => alert('Copied to clipboard!'),
            () => alert('Failed to copy!')
        );
    };

    const clearGeneratedCode = () => {
        setGeneratedHTML('');
        setGeneratedCSS('');
        setDebugLog('');
    };

    return (
        <div>
            <h2>Generated HTML</h2>
            <button className="button" onClick={collectStyles}>Generate</button>
            <pre>{generatedHTML}</pre>
            <button className='button' onClick={() => copyToClipboard(generatedHTML)}>Copy HTML</button>
            <h2>Generated CSS</h2>
            <pre>{generatedCSS}</pre>
            <button className="button" onClick={() => copyToClipboard(generatedCSS)}>Copy CSS</button>
            <h2>Debug Log</h2>
            <pre>{debugLog}</pre>
            <button className='button' onClick={clearGeneratedCode}>Clear</button>
        </div>
    );
};

export default CodeGenerator;