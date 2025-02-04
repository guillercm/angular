const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();


const targetPath = './src/environments/environments.ts';
const targetProdPath = './src/environments/environments.prod.ts';

const environments =
  {
    mapbox_key: 'MAPBOX_KEY'
  }

let stringEnvironments = "";

Object.keys(environments).forEach((key) => stringEnvironments += `${key}: "${ process.env[environments[key]]  }",`)

const envFileContent = `export const environment = {
  ${stringEnvironments}
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );
writeFileSync( targetProdPath, envFileContent );
