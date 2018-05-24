# KanbanCMS

/!\ WIP /!\

A Kanban based static site generator.

## How it works ?

KanbanCMS uses Trello as a redactional UI of Content Managment System. You can transform a Trello board into a static website, like for example a blog. Every time you change something on your board a new build process can be triggered using Webhooks. The build contains the static files you can deploy somewhere to host your static website.

### Installation

Run:
```
git clone https://github.com/wbkd/KanbanCMS
cd KanbanCMS
npm install
```

### Usage

You will need to copy the API Key and the API Token from your [Trello App Key](https://trello.com/app-key) to the `config.json` file. An example config file will look like this:
```
{
    "api": {
        "url": "https://api.trello.com/1/",
        "key": "asenoiuwqeWNEUfnewoeFNWQetr3295023rer",
        "token": "ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543",
        "list": "124f9hue2983232rj32052s"
    },
    "dest": {
        "root": "src/static",
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

The config options can be also passed as environment variables or as command-line arguments:
```
API__KEY=asenoiuwqeWNEUfnewoeFNWQetr3295023rer API__TOKEN=ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543 API__LIST=124f9hue2983232rj32052s node bin/get_data.js

```
```
node bin/get_data.js --api.key=asenoiuwqeWNEUfnewoeFNWQetr3295023rer --api.token=ASnqoiwqenmNEWOIWNrffnklef3io2r032rnewfoid3T439543 --api.list=124f9hue2983232rj32052s
```

#### Options

| Name        | Description                                       | Default                       |
|-------------|---------------------------------------------------|-------------------------------|
| api.url     | The base API url                                  | `"https://api.trello.com/1/"` |
| api.key     | The API key (**required**)                        |                               |
| api.token   | The API token (**required**)                      |                               |
| api.list    | The ID of the trello list to watch (**required**) |                               |
| dest.root   | The folder where all JSON files are saved         | `"src/static/"`               |
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
