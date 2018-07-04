# Tresor example

An example site using [tresor](https://github.com/wbkd/tresor) backed by this [this example board](https://trello.com/b/dhhEnV8b/tresor-example). The site is hosted on Netlify and is published [here]() using webhooks, so that each change to the Trello board will trigger a new build.
Take a look at the board to understand how the content behind the website is organised.

The Trello API Key and API Token are not stored in the `config.json` file since this will be public, but you can either add them to the config (if it's a private repository) or pass them on build as environment variables, as we also do for this example.
