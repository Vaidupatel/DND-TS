// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

// interface ComponentStyle {
//     [key: string]: { [key: string]: string };
// }

// const CodeGenerator: React.FC = () => {
//     const componentNames = useSelector((state: RootState) => state.componentNames.names);
//     const [componentStyles, setComponentStyles] = useState<ComponentStyle>({});

//     useEffect(() => {
//         const collectStyles = () => {
//             const styles: ComponentStyle = {};
//             const classPrefixes = Object.values(componentNames).map(name => `droppable${name.charAt(0).toUpperCase() + name.slice(1)}-`);
//             console.log(classPrefixes);
//             const selector = classPrefixes.map(prefix => `[class^="${prefix}"]`).join(', ');

//             const elements = document.querySelectorAll(selector);

//             elements.forEach((el) => {
//                 const className = el.className;
//                 const styleObject: { [key: string]: string } = {};

//                 // Access the React component instance
//                 const reactInstance = (el as any)[Object.keys(el).find(key => key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$'))!];

//                 if (reactInstance && reactInstance.memoizedProps && reactInstance.memoizedProps.style) {
//                     const combinedStyles = reactInstance.memoizedProps.style;

//                     // Extract styles from combinedStyles
//                     Object.entries(combinedStyles).forEach(([key, value]) => {
//                         if (typeof value === 'string' || typeof value === 'number') {
//                             // Convert camelCase to kebab-case
//                             const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
//                             styleObject[cssKey] = String(value);
//                         }
//                     });
//                 }

//                 styles[className] = styleObject;
//             });

//             setComponentStyles(styles);
//         };

//         // Add a delay to ensure components are rendered
//         const timer = setTimeout(() => {
//             collectStyles();
//         }, 100);

//         // Set up a MutationObserver to watch for style changes
//         const observer = new MutationObserver((mutations) => {
//             mutations.forEach((mutation) => {
//                 if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
//                     collectStyles();
//                 }
//             });
//         });

//         const config = { attributes: true, subtree: true, attributeFilter: ['style'] };
//         observer.observe(document.body, config);

//         return () => {
//             clearTimeout(timer);
//             observer.disconnect();
//         };
//     }, [componentNames]);

//     const generateHTML = () => {
//         let html = '<div id="root">\n';
//         Object.keys(componentStyles).forEach((className) => {
//             html += `  <div class="${className}"></div>\n`;
//         });
//         html += '</div>';
//         return html;
//     };

//     const generateCSS = () => {
//         let css = '';
//         Object.entries(componentStyles).forEach(([className, style]) => {
//             css += `.${className} {\n`;
//             Object.entries(style).forEach(([property, value]) => {
//                 css += `  ${property}: ${value};\n`;
//             });
//             css += '}\n\n';
//         });
//         return css;
//     };

//     return (
//         <div>
//             <h2>Generated HTML</h2>
//             <button className="button" onClick={collect}>Generate</button>
//             <pre>{generateHTML()}</pre>
//             <h2>Generated CSS</h2>
//             <pre>{generateCSS()}</pre>
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
    const [componentStyles, setComponentStyles] =
        useState<ComponentStyle>({});
    const [generatedHTML, setGeneratedHTML] = useState<string>('');
    const [generatedCSS, setGeneratedCSS] = useState<string>('');

    const collectStyles = () => {
        const styles: ComponentStyle = {};
        const classPrefixes = Object.values(componentNames).map(name => `droppable${name.charAt(0).toUpperCase() + name.slice(1)}-`);
        const selector = classPrefixes.map(prefix => `[class^="${prefix}"]`).join(', ');

        const elements = document.querySelectorAll(selector);

        elements.forEach((el) => {
            const className = el.className;
            const styleObject: { [key: string]: string } = {};

            // Access the React component instance
            const reactInstance = (el as any)[Object.keys(el).find(key => key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$'))!];

            if (reactInstance && reactInstance.memoizedProps && reactInstance.memoizedProps.style) {
                const combinedStyles = reactInstance.memoizedProps.style;

                // Extract styles from combinedStyles
                Object.entries(combinedStyles).forEach(([key, value]) => {
                    if (typeof value === 'string' || typeof value === 'number') {
                        // Convert camelCase to kebab-case
                        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                        styleObject[cssKey] = String(value);
                    }
                });
            }

            styles[className] = styleObject;
        });

        setComponentStyles(styles);
        setGeneratedHTML(generateHTML(styles))
        setGeneratedCSS(generateCSS(styles));

    };


    const generateHTML = (styles: ComponentStyle) => {
        let html = `<!DOCTYPE html>
        <html lang="en">
         <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link rel="stylesheet" href="style.css">
         <title>Document</title>
         </head>
         <body>\n`;
        Object.keys(styles).forEach((className) => {
            html += `  <div class="${className}"></div>\n`;
        });
        html += `</body>\n</html >`;
        return html;
    };

    const generateCSS = (style: ComponentStyle) => {
        let css = '';
        Object.entries(style).forEach(([className, style]) => {
            css += `.${className} {\n`;
            Object.entries(style).forEach(([property, value]) => {
                css += `  ${property}: ${value};\n`;
            });
            css += '}\n\n';
        });
        return css;
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
            <button className='button' onClick={clearGeneratedCode}>Clear</button>
        </div>
    );
};

export default CodeGenerator;
