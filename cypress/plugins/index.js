
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module
const fs = require('fs-extra');
const path = require('path');
// const selectTests = require('cypress-select-tests')

// const pickTests = (filename, foundTests, config) => {
//   console.log('picking tests from file', filename)

//   // found tests will be names of the tests found in "filename" spec
//   // it is a list of names, each name an Array of strings
//   // ['suite 1', 'suite 2', ..., 'test name']
//   console.log('found tests')
//   console.log(foundTests)
//   const group = config.env.group || ' '

//   // let's only run tests with "does" in the title
//   return foundTests.filter(fullTestName => fullTestName.join(' ').includes(group))
// }

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve(`cypress.${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  // accept a configFile value or use dev by default
  const file = config.env.configFile || 'dev'

  //on('file:preprocessor', selectTests(config, pickTests))
  
  return getConfigurationByFile(file)
}