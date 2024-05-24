// figma.config.js
require('dotenv').config()

const fileId = process.env.FILE_ID
const figmaToken = process.env.FIGMA_TOKEN

const outputters = [
  require('@figma-export/output-components-as-svg')({ output: './dist' }),
]

/** @type {import('@figma-export/types').FigmaExportRC} */
module.exports = {
  figmaToken,
  commands: [
    [
      'components',
      {
        fileId,
        onlyFromPages: ['NPN'],
        outputters,
      },
    ],
  ],
}
