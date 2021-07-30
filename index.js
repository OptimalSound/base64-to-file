const core = require('@actions/core');
const fse = require('fs-extra')
const path = require('path');

// get input parameter values from config
var fileName = path.join(process.env.GITHUB_WORKSPACE,core.getInput('fileName'));

var encodedString = core.getInput('encodedString');

// most @actions toolkit packages have async methods
async function run() {
  try { 
    console.log(process.env);
    const tempFile = Buffer.from(encodedString, 'base64');
    
    if (tempFile.length == 0)
      core.setFailed('Temporary file value is not set');
    
    fse.outputFile(fileName, tempFile, (err) => {
      if (err) throw err;
      console.log('Wrote file!');
    });

    core.setOutput('filePath', fileName);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
