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
 *Request make http reequests to the API
 */
class Request {
	/**
	 * Request class constructor
	 * @constructor
	 */
	constructor() {}
	/**
	 * Make and send requests to ghasedak api
	 * @param {string} [reqpath] - path to api endpoint
	 * @param {object} [data] - post data
	 */
	request(reqpath, data) {
		// create request full path
		let reqfullpath = this.__apiVersion + reqpath;

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
				charset: "utf-8"
			}
		};

		let postreq = http.request(postopts, function(res) {
			res.setEncoding("utf8");
			res.on("data", function(c) {
				console.log(c);
			});
			res.on("error", function(err) {
				console.log("An error occured: ", err);
			});
		});

		postreq.write(postdata);
		postreq.end();
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
	 * @param {string} [apiBase=ghasedakapi.com] - api address
	 * @param {string} [apiVersion=/api/v1] - api version
	 */
	constructor(apiKey, apiVersion = "/api/v1", apiBase = "ghasedakapi.com") {
		super();
		this.__apiKey = apiKey;
		this.__apiVersion = apiVersion;
		this.__apiBase = apiBase;
	}

	/**
	 * Send simple sms
	 * @see https://ghasedakapi.com/docs
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
		this.request("/sms/send/simple", {
			message: this.__message,
			receptor: this.__receptor,
			linenumber: opts.linenumber,
			senddate: opts.senddate,
			checkid: opts.checkid
		});
	}

	/**
	 * Send bulk sms - type 1
	 * @see https://ghasedakapi.com/docs
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
		this.request("/sms/send/bulk", {
			message: this.__message,
			receptor: this.__receptor,
			linenumber: this.__linenumber,
			senddate: this.__senddate,
			checkid: opts.checkid
		});
	}
	/**
	 * Send bulk sms - type 2
	 * @see https://ghasedakapi.com/docs
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
		this.request("/sms/send/bulk2", {
			message: this.__message,
			receptor: this.__receptor,
			linenumber: opts.linenumber,
			senddate: opts.senddate,
			checkid: opts.checkid
		});
	}

	/**
	 * Send bulk sms
	 * @see https://ghasedakapi.com/docs
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
	 * @see https://ghasedakapi.com/docs
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
		this.request("/voice/send", {
			message: this.__message,
			receptor: this.__receptor,
			senddate: opts.senddate
		});
	}
}

module.exports = Ghasedak;
