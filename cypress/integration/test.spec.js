// const openvpnmanager = require("node-openvpn");

// describe("testing db connection", () => {
// 	context("Context", () => {
// 		let openvpn;

// 		before("Connect to VPN", () => {
// 			const opts = {
// 				host: process.env.VPN.host, // normally '127.0.0.1', will default to if undefined
// 				//port: 1337, //port openvpn management console
// 				//timeout: 1500, //timeout for connection - optional, will default to 1500ms if undefined
// 				//logpath: 'log.txt' //optional write openvpn console output to file, can be relative path or absolute
// 			};
// 			const auth = {
// 				user: process.env.db.userName,
// 				pass: process.env.db.password,
// 			};

// 			openvpn = openvpnmanager.connect(opts);

// 			openvpn.on("connected", () => {
// 				openvpnmanager.authorize(auth);
// 			});
// 		});

// 		it("test 1", () => {});
// 	});
// });
