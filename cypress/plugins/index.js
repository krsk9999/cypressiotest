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
const fs = require("fs-extra");
const path = require("path");
const sqlServer = require("cypress-sql-server");

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve(`cypress.${file}.json`);

	return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {

	tasks = sqlServer.loadDBPlugin(config.env.db);

	on("task", tasks);

	// accept a configFile value or use dev by default
	const file = config.env.configFile || "dev";

	//on('file:preprocessor', selectTests(config, pickTests))
	on("before:browser:launch", (browser = {}, args) => {
		// browser will look something like this
		// {
		//   name: 'chrome',
		//   displayName: 'Chrome',
		//   version: '63.0.3239.108',
		//   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		//   majorVersion: '63'
		// }

		if (browser.name === "chrome") {
			// `args` is an array of all the arguments
			// that will be passed to Chrome when it launchers
			//args.push("--start-fullscreen");

			// whatever you return here becomes the new args
			return args;
		}

		if (browser.name === "electron") {
			// `args` is a `BrowserWindow` options object
			// https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
			//args["fullscreen"] = true;

			// whatever you return here becomes the new args
			return args;
		}
	});

	return getConfigurationByFile(file);
};
