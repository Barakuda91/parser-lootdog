const express = require('express');
let port = 3000;

module.exports = class Router{
    constructor() {
        this.app = express();
    };

    async init (struct) {
        console.log('Init');
    };
};