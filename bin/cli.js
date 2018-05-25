#! /usr/bin/env node
const meow = require('meow');
const getData = require('..');

meow(`
  Usage
  $ staticms
  Run staticms

  $ staticms --help
  Print this help message

  $ staticms --version
  Print the current version

  Examples
  $ staticms --api.key=XXX --api.token=XXX --api.list=XXX

  Run the script to request the remote JSON files and save
  them locally.
  You can alternatively pass the configuration options as
  environment variables or writing them to config.json.
  See the online documentation for further information
`);

getData()
  .catch(err => console.error(err.message));
