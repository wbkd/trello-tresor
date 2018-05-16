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

You will need to add the API Key and the API Token from your [Trello App Key](https://trello.com/app-key) to the `.env` file placed in the project root directory.
An example of `.env` file will be:

```
LIST_ID=asndiuhwqe9832143hz58
API_KEY=qjoiurh723328r732093rjewf84327t82
API_TOKEN=nr32789r3298421n9823r1j432198r329r2r32b43znjgkn923rn
```

You can also select the fields of a [card](https://developers.trello.com/reference#card-object), an [attachment](https://developers.trello.com/v1.0/reference#attachments) or an [user](https://developers.trello.com/v1.0/reference#member-object) adding the following to your `.env` file:
```
FIELDS=id,name,dateLastActivity,desc,idList,labels
ATTACHMENTS_FIELDS=preview,url
USER_FIELDS=fullName,bio
```
