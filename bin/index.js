#! /usr/bin/env node
const getData = require('../src/index');

getData()
  .catch(err => console.error(err.message));
