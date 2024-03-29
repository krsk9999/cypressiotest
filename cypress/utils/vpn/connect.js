const openvpnmanager = require("node-openvpn");
require('dotenv').config()

const opts = {
	host: process.env.VPN_HOST, 	// normally '127.0.0.1', will default to if undefined
	port: 1337, 					//port openvpn management console
	timeout: 1500, 					//timeout for connection - optional, will default to 1500ms if undefined
	logpath: "./log.txt" 			//optional write openvpn console output to file, can be relative path or absolute
};
const auth = {
	user: process.env.VPN_USERNAME,
	pass: process.env.VPN_PASSWORD,
};

const openvpn = openvpnmanager.connect(opts);

// will be emited on successful interfacing with openvpn instance
openvpn.on("connected", () => {
	openvpnmanager.authorize(auth);
});

// emits console output of openvpn instance as a string
openvpn.on("console-output", output => {
	console.log(output);
});

// emits console output of openvpn state as a array
openvpn.on("state-change", state => {
	console.log(state);
});

// emits console output of openvpn state as a string
openvpn.on("error", error => {
	console.log("Error");
	console.log(error);
});

// and finally when/if you want to
openvpnmanager.disconnect();

// emits on disconnect
openvpn.on("disconnected", () => {
	// finally destroy the disconnected manager
	openvpnmanager.destroy();
});
