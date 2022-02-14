const fetch = require('node-fetch');

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

  async request(reqpath, data) {
    // create request full path
    let reqfullpath = this.__apiBase + this.__apiVersion + reqpath;

    console.log(reqfullpath)

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let promise = await fetch(reqfullpath, {
      method: 'POST',
      body: formBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        charset: "utf-8",
        apikey: this.__apiKey
      }
    }).then(res => res.json())
      .then(json => this.__resdata = json);

    return promise;
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
  constructor(apiKey, apiVersion = "/v2", apiBase = "https://api.ghasedak.me") {
    super();
    this.__apiKey = apiKey;
    this.__apiVersion = apiVersion;
    this.__apiBase = apiBase;
    this.__resdata;
  }

  /**
   * Check status
   * @see https://ghasedak.io/docs
   * @param {object} [opts] - status info to retrieve
   */
  async status(opts) {
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
    let promise = await this.request("/sms/status?agent=node", {
      "id": this.__id,
      "type": this.__type,
    });

    console.log(promise);
    return promise;
  }

  /**
   * Send simple sms
   * @see https://ghasedak.io/docs
   * @param {object} [opts] - sms info to send
   */
  async send(opts) {
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
    if (!opts.hasOwnProperty("senddate")) {
      opts.senddate = '';
    }
    if (!opts.hasOwnProperty("checkid")) {
      opts.checkid = '';
    }
    let promise = await this.request("/sms/send/simple?agent=node", {
      "message": this.__message,
      "receptor": this.__receptor,
      "linenumber": opts.linenumber,
      "senddate": opts.senddate,
      "checkid": opts.checkid
    });
    console.log(promise);
  }
  /**
   *  Send bulk sms - type 1
   * @see https://ghasedak.io/docs
   * @param {object} [opts] - sms info to send
   */
  async bulk1(opts) {

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

    if (!opts.hasOwnProperty("senddate")) {
      opts.senddate = '';
    }
    if (!opts.hasOwnProperty("checkid")) {
      opts.checkid = '';
    }
    let promise = await this.request("/sms/send/bulk?agent=node", {
      "message": this.__message,
      "receptor": this.__receptor,
      "linenumber": opts.linenumber,
      "senddate": opts.senddate,
      "checkid": opts.checkid
    });
    console.log(promise);
  }
  async bulk2(opts) {

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
    if (!opts.hasOwnProperty("senddate")) {
      opts.senddate = '';
    }
    if (!opts.hasOwnProperty("checkid")) {
      opts.checkid = '';
    }
    let promise = await this.request("/sms/send/bulk2?agent=node", {
      "message": this.__message,
      "receptor": this.__receptor,
      "linenumber": opts.linenumber,
      "senddate": opts.senddate,
      "checkid": opts.checkid
    });
    console.log(promise);
  }
  bulk(opts, bulktype = 2) {
    if (bulktype == 1) {
      this.bulk1(opts);
    } else {
      this.bulk2(opts);
    }
  }
  // ----------------------------------
  /**
     * Send voice call
     * @see https://ghasedak.io/docs
     * @param {object} [opts] - voice call
     */
  async voicecall(opts) {
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
    if (!opts.hasOwnProperty("senddate")) {
      opts.senddate = '';
    }
    /** send voice call request */
    let promise = await this.request("/voice/send?agent=node", {
      "message": this.__message,
      "receptor": this.__receptor,
      "senddate": opts.senddate
    });
    console.log(promise);
  }

  /**
   * send sms in template
   * @see https://ghasedak.io/docs
   * @param {object} [opts] - templated sms data
   */
//   async template(opts) {
//     /** receptor key is required in opts object */
//     if (!opts.hasOwnProperty("receptor")) {
//       console.log("receptor is required.");
//       return;
//     } else {
//       this.__receptor = opts.receptor;
//     }

//     /** type key is required in opts object */
//     if (!opts.hasOwnProperty("type")) {
//       console.log("type is required.");
//       return;
//     } else {
//       this.__type = opts.type;
//     }

//     /** template key is required in opts object */
//     if (!opts.hasOwnProperty("template")) {
//       console.log("template is required.");
//       return;
//     } else {
//       this.__template = opts.template;
//     }

//     /** param1 key is required in opts object */
//     if (!opts.hasOwnProperty("param1")) {
//       console.log("param1 is required.");
//       return;
//     } else {
//       this.__param1 = opts.param1;
//     }

//     /** send voice call request */
//     let promise = await this.request("/sms/verify?agent=node", {
//       receptor: this.__receptor,
//       type: this.__type,
//       template: this.__template,
//       param1: this.__param1,
//       param2: opts.param2,
//       param3: opts.param3
//     });
//     console.log(promise);

//   }

  /**
   * send verification sms to user
   * @see https://ghasedak.io/docs
   * @param {object} [opts] - user phone and client details
   */
  async verification(opts) {
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
    let promise = await this.request("/sms/send/verification?agent=node", {
      "receptor": this.__receptor,
      "type": this.__type,
      "template": this.__template,
      "ip": opts.ip,
      "param1": opts.param1,
      "param2": opts.param2,
      "param3": opts.param3
    });
    console.log(promise);
  }

  /**
   * check verification if valid for user
   * @see https://ghasedak.io/docs
   * @param {object} [opts] - user phone and client details
   */
  async check_verification(opts) {
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
    let promise = await this.request("/sms/check/verification?agent=node", {
      "receptor": this.__receptor,
      "token": this.__token,
      "ip": opts.ip
    });
    console.log(promise);
  }
}

module.exports = Ghasedak;

// ////////////////////////

// var data = {
//   "id": "2914845496",
//   "type": "1",
// };

