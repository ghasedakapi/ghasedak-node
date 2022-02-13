/**
 * @file
 * @copyright  2018 Ghasedak ICT
 * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
 *             ghasedak.js is freely distributable.
 */
const qs = require("querystring");
const http = require("https");
const fs = require("fs");

/**
 * Request make http reequests to the API
 */
class Request {
	/**
	 * Request class constructor
	 * @constructor
	 */
	constructor() { }

	/**
	 * Make and send requests to ghasedak api
	 * @param {string} [reqpath] - path to api endpoint
	 * @param {object} [data] - post data
	 */

	request(reqpath, data) {
		// create request full path
		let reqfullpath = this.__apiVersion + reqpath;

		console.log(reqfullpath)

		// append apikey to post params
		data["apikey"] = this.__apiKey;

		let postdata = qs.stringify(data);
		let postopts = {
			host: this.__apiBase,
			port: "443",
			path: reqfullpath,
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				charset: "utf-8",
				apikey: this.__apiKey
			}
		};
		var resdata;
		let postreq = http.request(postopts, function (res) {
			res.setEncoding("utf8");
			res.on("data", function (c) {
				// console.log(c);
				resdata = c.toString();
				console.log(resdata);
				// ???
			});
			res.on("error", function (err) {
				console.log("An error occured: ", err);
			});
		});
		console.log(resdata);//???

		postreq.write(postdata);
		postreq.end();
		return resdata;
	}
}

/**
 * Ghasedak encapsulates the functionality to create sms API wrapper object.
 */
class Ghasedak extends Request {
	/**
	 * Create a new Ghasedak
	 * @constructor
	 * @param {string} [apiKey] - the credential to authenticate to Ghasedak.
	 * @param {string} [apiBase=api.ghasedak.io] - api address
	 * @param {string} [apiVersion=/v2] - api version
	 */
	constructor(apiKey, apiVersion = "/v2", apiBase = "api.ghasedak.me") {
		super();
		this.__apiKey = apiKey;
		this.__apiVersion = apiVersion;
		this.__apiBase = apiBase;
	}

	/**
	 * Check status
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - status info to retrieve
	 */
	status(opts) {
		/** id key is required in opts object */
		if (!opts.hasOwnProperty("id")) {
			console.log(" id is required.");
			return;
		} else {
			this.__id = opts.id;
		}

		/** type key is required in opts object */
		if (!opts.hasOwnProperty("type")) {
			console.log("type is required.");
			return;
		} else {
			this.__id = opts.id;
		}

		/** send status request */
		this.request("/sms/status?agent=node", {
			id: this.__id,
			type: this.__type,
		});

		console.log('-------------');
		// console.log(resdata); // ???
		console.log('-------------');
	}

	/**
	 * Send simple sms
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - sms info to send
	 */
	send(opts) {
		/** message key is required in opts object */
		if (!opts.hasOwnProperty("message")) {
			console.log(" message is required.");
			return;
		} else {
			this.__message = opts.message;
		}

		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** send simple sms request */
		this.request("/sms/send/simple?agent=node", {
			message: this.__message,
			receptor: this.__receptor,
			linenumber: opts.linenumber,
			senddate: opts.senddate,
			checkid: opts.checkid
		});
	}

	/**
	 * Send bulk sms - type 1
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - bulk sms info to send
	 */
	bulk1(opts) {
		/** message key is required in opts object */
		if (!opts.hasOwnProperty("message")) {
			console.log(" message is required.");
			return;
		} else {
			this.__message = opts.message;
		}

		/** linenumber key is required in opts object */
		if (!opts.hasOwnProperty("linenumber")) {
			console.log("linenumber is required.");
			return;
		} else {
			this.__linenumber = opts.linenumber;
		}

		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** senddate key is required in opts object */
		if (!opts.hasOwnProperty("senddate")) {
			console.log("senddate is required.");
			return;
		} else {
			this.__senddate = opts.senddate;
		}

		/** send bulk sms request - type 1 */
		this.request("/sms/send/bulk?agent=node", {
			message: this.__message,
			receptor: this.__receptor,
			linenumber: this.__linenumber,
			senddate: this.__senddate,
			checkid: opts.checkid
		});
	}
	/**
	 * Send bulk sms - type 2
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - bulk sms info to send
	 */
	bulk2(opts) {
		/** message key is required in opts object */
		if (!opts.hasOwnProperty("message")) {
			console.log(" message is required.");
			return;
		} else {
			this.__message = opts.message;
		}

		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** send simple sms request */
		this.request("/sms/send/bulk2?agent=node", {
			message: this.__message,
			receptor: this.__receptor,
			linenumber: opts.linenumber,
			senddate: opts.senddate,
			checkid: opts.checkid
		});
	}

	/**
	 * Send bulk sms
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - bulk sms info to send
	 * @param {int} [bulktype] - 1 for bulk and 2 for bulk2
	 */
	bulk(opts, bulktype = 2) {
		if (bulktype == 1) {
			this.bulk1(opts);
		} else {
			this.bulk2(opts);
		}
	}

	/**
	 * Send voice call
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - voice call
	 */
	voicecall(opts) {
		/** message key is required in opts object */
		if (!opts.hasOwnProperty("message")) {
			console.log(" message is required.");
			return;
		} else {
			this.__message = opts.message;
		}

		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** send voice call request */
		this.request("/voice/send?agent=node", {
			message: this.__message,
			receptor: this.__receptor,
			senddate: opts.senddate
		});
	}

	/**
	 * send sms in template
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - templated sms data
	 */
	template(opts) {
		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** type key is required in opts object */
		if (!opts.hasOwnProperty("type")) {
			console.log("type is required.");
			return;
		} else {
			this.__type = opts.type;
		}

		/** template key is required in opts object */
		if (!opts.hasOwnProperty("template")) {
			console.log("template is required.");
			return;
		} else {
			this.__template = opts.template;
		}

		/** param1 key is required in opts object */
		if (!opts.hasOwnProperty("param1")) {
			console.log("param1 is required.");
			return;
		} else {
			this.__param1 = opts.param1;
		}

		/** send voice call request */
		this.request("/sms/verify?agent=node", {
			receptor: this.__receptor,
			type: this.__type,
			template: this.__template,
			param1: this.__param1,
			param2: opts.param2,
			param3: opts.param3
		});
	}

	/**
	 * send verification sms to user
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - user phone and client details
	 */
	verification(opts) {
		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** type key is required in opts object */
		if (!opts.hasOwnProperty("type")) {
			console.log("type is required.");
			return;
		} else {
			this.__type = opts.type;
		}

		/** template key is required in opts object */
		if (!opts.hasOwnProperty("template")) {
			console.log("template is required.");
			return;
		} else {
			this.__template = opts.template;
		}

		/** send voice call request */
		this.request("/sms/send/verification?agent=node", {
			receptor: this.__receptor,
			type: this.__type,
			template: this.__template,
			ip: opts.ip,
			param1: opts.param1,
			param2: opts.param2,
			param3: opts.param3
		});
	}

	/**
	 * check verification if valid for user
	 * @see https://ghasedak.io/docs
	 * @param {object} [opts] - user phone and client details
	 */
	check_verification(opts) {
		/** receptor key is required in opts object */
		if (!opts.hasOwnProperty("receptor")) {
			console.log("receptor is required.");
			return;
		} else {
			this.__receptor = opts.receptor;
		}

		/** type key is required in opts object */
		if (!opts.hasOwnProperty("token")) {
			console.log("token is required.");
			return;
		} else {
			this.__token = opts.token;
		}

		/** send voice call request */
		this.request("/sms/check/verification?agent=node", {
			receptor: this.__receptor,
			token: this.__token,
			ip: opts.ip
		});
	}
}

module.exports = Ghasedak;
