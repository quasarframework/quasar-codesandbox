![Quasar Framework logo](https://cdn.rawgit.com/quasarframework/quasar-art/863c14bd/dist/svg/quasar-logo-full-inline.svg)

# Quasar App Codesandbox Template
> A Template for using Quasar on Codesandbox.io.

![Codesanbox Entry Server Screen](https://cdn.quasar.dev/codesandbox/codesandbox-entry.jpg)

This is the template used for the server template found on [Codesandbox.io](https://codesandbox.io). The template builds a full application running in the development server mode. With the app running in Codesandbox, you can work with a FULL Quasar application and not just the UMD version, as is the case with Codepen and JSFiddle.

## Purpose

The purpose of this template on Codesandbox is so developers can create more intricate examples of their code, like when using Axios, Vuex or other Vue plugins. These examples can then be used for both the training and/ or teaching of other devs on using Quasar and also for troubleshooting problems with the core dev team of Quasar.

## Usage

Using this template will require you to register as a Codesandbox user. Registration only currently works over Github, so that is where you'll need an account.

Once you've registered to Codesandbox, to start the template, simply click on "Create Sandbox" at the top of the [Codesandbox.io index page](https://codesandbox.io).

Then click on `SERVER TEMPLATES` and then on the `Quasar` button.

![Codesanbox Start Server Screen](https://cdn.quasar.dev/codesandbox/codesandbox-start.jpg)

The server and container will start automatically. Once you make any change and save it, Codesandbox will automatically fork the sandbox for you.

## Different Modes

This template currently loads a *SPA* application mode of Quasar.

If you would like to work with the PWA or SSR versions of Quasar, please make the following changes to the `start` script entries in the `package.json`.

#### PWA

```json

 "scripts": {
    "start": "quasar dev -m pwa",

```

#### SSR

```json

 "scripts": {
    "start": "quasar dev -m ssr",

```

Once you've changed the the `start` entry of `scripts` in the `package.json` file accordingly, you simply need to restart the container's server.

![Codesanbox Restart Server Screen](https://cdn.quasar.dev/codesandbox/codesandbox-restart-server.jpg)

Once that is done, it should take a minute or so to reload the application in the new mode.

## Quasar Repositories

* [Quasar Framework](https://github.com/quasarframework/quasar)

## Contributing

We're excited if you want to contribute to Quasar under any form (report bugs, write a plugin, fix an issue, write a new feature, help with the documentation). Any help is much appreciated!

### Issue Reporting Guidelines

**Please use the appropriate Github repo to report issues. See "Related Components" above.** For example, a bug related to CLI should be reported to the CLI repo, one related to build issues to Quasar Framework Templates repo and so on. If you find an issue with this repo, report it in the issues here.

- The issue list of the repository is **exclusively** for bug reports and feature requests. For anything else please use the [Community Forum](https://forum.quasar.dev).

- Try to search for your issue, it may have already been fixed in the development branch or it may have a resolution.

- Check if the issue is reproducible with the latest stable version of Quasar. If you are using a pre-release, please indicate the specific version you are using.

- It is **required** that you clearly describe the steps necessary to reproduce the issue you are running into. Issues with no clear repro steps will not be triaged. If an issue labeled "need repro" receives no further input from the issue author for more than 5 days, it will be closed.

- If your issue is resolved but still open, don’t hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

## License

Copyright (c) 2016-present Razvan Stoenescu

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
