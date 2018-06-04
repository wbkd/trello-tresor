# Tresor
⚠️ WIP ⚠️

A tool to fetch **Trello API** data and store them locally as **static** JSON files.

With *Tresor* you can use Trello as a redactional UI and content managment system. It will transform a Trello list into a set of static JSON files ready to be served as an API for a static website.

## How it works ?

Tresor is responsible for reading the Trello API and saves the results locally as static JSON files, in a folder structure that allows to consume the data as API endpoints.
The static files can be either copied in the client build folder or hosted somewhere else (CDNs, ...), so that the client can then consume the data in a RESTful way.

Setting up Continous Delivery it is then possible to configure a Webhook to trigger a new build when the content served from you API is changed.

<p align="center" >
    <img src="https://i.imgur.com/o1IGCDT.png">
</p>

This approach will allow your codebase to be entirely **static** and **serverless**, but also has the advantages of a dynamic content management system, as your site will be **automatically updated** when the content changes.

## Installation

Run:
```sh
npm install tresor
```

## Usage

You will need to copy the **API Key** and the **API Token** from your [Trello App Key](https://trello.com/app-key) to the `config.json` file in the project root folder. An example **config** file will look like this (see [options](#options)):

```JSON
{
    "api": {
        "url": "https://api.trello.com/1/",
        "key": "asenoiuwqeWNEUfnewoeFNWQetr3295023rer",
        "token": "ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543",
        "list": ["124f9hue2983232rj32052s"]
    },
    "dest": {
        "root": "static",
        "all": "all.json",
        "tags": "tags.json",
        "post": "post",
        "tag": "tag",
        "images": false
    },
    "fields": {
        "fields": ["id", "name", "dateLastActivity", "desc", "idList", "labels"],
        "members": true,
        "member_fields": ["fullName", "bio"],
        "attachments": true,
        "attachment_fields": ["previews", "url"]
    },
    "pagination": {
        "entriesPerPage": 20
    }
}
```

Run the following command to **download the JSON files**:
```sh
tresor
```

The config options can be also passed as environment variables:
```sh
API__KEY=asenoiuwqeWNEUfnewoeFNWQetr3295023rer API__TOKEN=ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543 API__LIST=124f9hue2983232rj32052s tresor
```

or as command-line arguments:

```sh
tresor --api.key=asenoiuwqeWNEUfnewoeFNWQetr3295023rer --api.token=ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543 --api.list=124f9hue2983232rj32052s
```

### Options

The options you can add to the `config.json` file or pass via command-line/environment variables are:

| Name        | Description                                       | Default                       |
|-------------|---------------------------------------------------|-------------------------------|
| api.url     | The base API url                                  | `"https://api.trello.com/1/"` |
| api.key     | The API key (**required**)                        |                               |
| api.token   | The API token (**required**)                      |                               |
| api.list    | The IDs (as array) of the trello lists to watch (**required**) |                  |
| dest.root   | The folder where all JSON files are saved         | `"static/"`                   |
| dest.all    | The filename of the JSON containings all entries  | `"all.json"`                  |
| dest.tags   | The filename of the JSON containings all tags     | `"tags.json"`                 |
| dest.post   | The folder name where all single posts are saved  | `"post"`                      |
| dest.tag    | The folder name where all single tags are saved   | `"tag"`                       |
| dest.images | The folder name where all images will be stored   | `false` (don't download images) |
| fields.fields | The post fields to be displayed                 | `["id", "name", "dateLastActivity", "desc", "idList", "labels"]` |
| fields.members | Display or not user information (true or false) | `true`                      |
| fields.member_fields | The user fields to be displayed           | `["fullName", "bio"]`       |
| fields.attachments | Display or not attachments information (true or false) | `true`           |
| fields.attachment_fields | The attachment fields to be displayed | `["previews", "url"]`       |
| pagination.entriesPerPage | The number of entries in a single JSON | `20`                        |


To get **further information** about the fields you can select, please refer to the [card](https://developers.trello.com/reference#card-object), [attachment](https://developers.trello.com/v1.0/reference#attachments) and [user](https://developers.trello.com/v1.0/reference#member-object) documentations.

### npx

This module is suitable to be used with `npx`, so that you don't need to install the module and add it to your package dependencies.
Just add `npx tresor` to your `prebuild` hook in the `package.json` of your module:

```JSON
{
  [...]
  "scripts": {
    "prebuild": "npx tresor",
  [...]
  }
}
```

**Done!**

### Help

Running `tresor --help` will print the following usage manual:
```sh
$ tresor --help

  A tool to fetch remote API data and store them locally as static JSON files

  Usage
  $ tresor
  Run tresor

  $ tresor --help
  Print this help message

  $ tresor --version
  Print the current version

  Examples
  $ tresor --api.key=XXX --api.token=XXX --api.list=XXX

  Run the script to request the remote JSON files and save
  them locally.
  You can alternatively pass the configuration options as
  environment variables or writing them to config.json.
  See the online documentation for further information

```
