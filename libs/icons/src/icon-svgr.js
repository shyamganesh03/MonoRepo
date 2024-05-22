const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');


const folderPath = path.join(__dirname, 'assets');


const files = fs.readdirSync(folderPath);


const iconFilesName = files.map(file => {
    const fileNameWithoutExtension = path.parse(file).name;
    return fileNameWithoutExtension;
});


const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}


iconFilesName.forEach(fileName => {
    const inputFilePath = path.join(folderPath, `${fileName}.svg`);
    const outputDirPath = path.join(__dirname, 'dist');

    exec(`npx @svgr/cli --native ${inputFilePath} -d ${outputDirPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error processing file ${fileName}: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`SVGR stderr for file ${fileName}: ${stderr}`);
            return;
        }
        console.log(`Successfully processed ${fileName}: ${stdout}`);
    });
});
