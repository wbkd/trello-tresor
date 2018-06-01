#! /usr/bin/env node
const meow = require('meow');
const getData = require('..');

meow(`
  Usage
  $ tresor
  Run tresor

  $ tresor --help
  Print this help message

  $ tresor --version
  Print the current version

  Examples
  $ tresor --api.key=XXX --api.token=XXX --api.list=XXX

  Run the script to request Trello API data and save
  them locally.
  You can alternatively pass the configuration options as
  environment variables or writing them to config.json.
  See the online documentation for further information
`);

getData()
  .catch(err => console.error(err.message));
