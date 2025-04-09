const folderEnvironments = './src/environments';
const targetPath = `${folderEnvironments}/environments.ts`;
const targetProdPath = `${folderEnvironments}/environments.prod.ts`;

const environments =
{
  production: 'PRODUCTION',
  configPath: 'CONFIG_PATH',
  docsPath: 'DOCS_PATH',
  pdfPath: 'PDF_PATH',
  timeoutSeconds: 'TIMEOUT_SECONDS',
  playwrightTestsPath: 'PLAYWRIGHT_TESTS_PATH'
}

const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config({path: ['.env', '.env.prod']});


function getEnvironments(isProd = false) {
  let stringEnvironments = "";
  Object.keys(environments).forEach((key) => {
    let value = process.env[environments[key] + (isProd ? '_PROD' : '')] || process.env[environments[key]];
    if (value !== 'true' && value !== 'false' && isNaN(value)) {
      value = `"${value}"`;
    }
    stringEnvironments += `  ${key}: ${value},\n`
  })
  const envFileContent = `export const environment = {
${stringEnvironments.replace(/\n$/, '').replace(/,$/, '')}
};`;
  return envFileContent;
}

mkdirSync(folderEnvironments, { recursive: true });

writeFileSync(targetPath, getEnvironments());
writeFileSync(targetProdPath, getEnvironments(true));
