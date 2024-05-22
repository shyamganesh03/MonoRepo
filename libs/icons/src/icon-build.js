const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'dist');

const files = fs.readdirSync(folderPath);

const iconFilesName = files.map(file => {
    const fileNameWithoutExtension = path.parse(file).name;
    return fileNameWithoutExtension;
});

const importStatement = () => {
    const initialStatement = [`import React__default from 'react';`];

    const importStatements = iconFilesName.map(fileName => {
        return `import ${fileName} from './dist/${fileName}';`;
    });

    const finalStatement = [...initialStatement, ...importStatements];

    return finalStatement.join('\n');
};

const renderIcon = () => {
    const iconsMapping = iconFilesName.map(fileName => {
        return `if (props.name === '${fileName}') { 
            return /*#__PURE__*/ React__default.createElement(${fileName}, props);
        }`;
    });

    return `const Icon = (props: any) => {
        ${iconsMapping.join('\n')}
    };`;
};

const renderPropsTypes = () => {
    return `const PropTypes: string[] = [${iconFilesName.map(fileName => `'${fileName}'`).join(', ')}];`;
};

const exportStatement = () => {
    return `export { Icon, PropTypes };`;
};

const createIcons = () => {
    const fileContent = `
${importStatement()}

${renderIcon()}

${renderPropsTypes()}

${exportStatement()}
`;

    fs.writeFileSync(path.join(__dirname, 'index.ts'), fileContent, 'utf8');
};

createIcons();
