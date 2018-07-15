# Ghasedak for node
[![Build Status](https://travis-ci.org/ghasedakapi/ghasedak-node.svg?branch=master)](https://travis-ci.org/ghasedakapi/ghasedak-node)
[![npm version](https://badge.fury.io/js/ghasedak.svg)](https://badge.fury.io/js/ghasedak)

Ghasedak sms webservice package for nodejs.

## install

You can simply install and use ghasedak nodejs library from npm:

```sh
npm install --save ghasedak
```

or from yarn:

```sh
yarn install ghasedak
```
## usage

Import `ghasedak` package:

```javascript
const Ghasedak = require("ghasedak");
```

Create an instance from Ghasedak class with your api key:

```javascript
let ghasedak = new Ghasedak("3ef8539ba50c06b2a11d674c8a7ded7d7360d7b090b5146ff0761e8d9927bd31");
```

Send some sms:

```javascript
ghasedak.send({
 	message: "Hello World!",
 	receptor: "09xxxxxxxxx"
 });
```
:)





