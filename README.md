# staticms
⚠️ WIP ⚠️

A tool to fetch remote API data and store them locally as static JSON files.

With staticms you can for example use Trello as a redactional UI and content managment system. You can transform a Trello board into a static website, like for example a blog. Every change on your board will trigger a new build process using Webhooks. The build contains the static files you can deploy somewhere to host your static website.

## How it works ?

This script is responsible to read a remote API (at the moment Trello is supported) and save the results locally as static JSON files, in a folder structure that allow to consume the data as a API endpoints.
The static files can be either copied in the client build folder or hosted somewhere else, so that the client can then consume the data in a RESTful way.

Setting up Continous Delivery it is then possible to configure a Webhook to trigger a new build when the content served from you API is changed.

![dia](https://i.imgur.com/o1IGCDT.png)

This approach will allow your codebase to be entirely static and serverless, but will also have the advantages of a dynamic content management system, as your site will be automatically updated when the content provided by your third-party API changes.

### Installation

Run:
```
npm install staticms
```

### Usage

You will need to copy the API Key and the API Token from your [Trello App Key](https://trello.com/app-key) to the `config.json` file in the project root folder. An example config file will look like this (see [options](#options)):
```
{
    "api": {
        "url": "https://api.trello.com/1/",
        "key": "asenoiuwqeWNEUfnewoeFNWQetr3295023rer",
        "token": "ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543",
        "list": "124f9hue2983232rj32052s"
    },
    "dest": {
        "root": "static",
        "all": "all.json",
        "tags": "tags.json",
        "post": "post",
        "tag": "tag"
    },
    "fields": {
        "fields": ["id", "name", "dateLastActivity", "desc", "idList", "labels"],
        "members": true,
        "member_fields": ["fullName", "bio"],
        "attachments": true,
        "attachment_fields": ["previews", "url"]
    }
}
```

And run the following command to download the JSON files:
```
staticms
```

The config options can be also passed as environment variables or as command-line arguments:
```
API__KEY=asenoiuwqeWNEUfnewoeFNWQetr3295023rer API__TOKEN=ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543 API__LIST=124f9hue2983232rj32052s staticms

```
or
```
staticms --api.key=asenoiuwqeWNEUfnewoeFNWQetr3295023rer --api.token=ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543 --api.list=124f9hue2983232rj32052s
```

#### Options

The options you can add to the `config.json` file or pass via command-line/environment variable are:

| Name        | Description                                       | Default                       |
|-------------|---------------------------------------------------|-------------------------------|
| api.url     | The base API url                                  | `"https://api.trello.com/1/"` |
| api.key     | The API key (**required**)                        |                               |
| api.token   | The API token (**required**)                      |                               |
| api.list    | The ID of the trello list to watch (**required**) |                               |
| dest.root   | The folder where all JSON files are saved         | `"static/"`               |
| dest.all    | The filename of the JSON containings all entries  | `"all.json"`                  |
| dest.tags   | The filename of the JSON containings all tags     | `"tags.json"`                 |
| dest.post   | The folder name where all single posts are saved  | `"post"`                      |
| dest.tag    | The folder name where all single tags are saved   | `"tag"`                       |
| fields.fields | The post fields to be displayed                 | `["id", "name", "dateLastActivity", "desc", "idList", "labels"]` |
| fields.members | Display or not user information (true or false) | `true`                      |
| fields.member_fields | The user fields to be displayed           | `["fullName", "bio"]'       |
| fields.attachments | Display or not attachments information (true or false) | `true`           |
| fields.attachment_fields | The attachment fields to be displayed | `["previews", "url"]`       |


To get further information about the fields you can select, please referr to the [card](https://developers.trello.com/reference#card-object), [attachment](https://developers.trello.com/v1.0/reference#attachments) and [user](https://developers.trello.com/v1.0/reference#member-object) documentations.
