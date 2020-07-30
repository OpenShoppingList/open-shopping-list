# Building and Testing open-shopping-list

This document describes how to set up your development environment to build and test the **Open Shopping List**.
It also explains the basic mechanics of using `git`, `node`, and `npm`.

* [**Prerequisite Software**](#prerequisite-software)
* [**Getting the Sources**](#getting-the-sources)
* [**Installing NPM Modules**](#installing-npm-modules)
* [**Building**](#building)

See the [contribution guidelines](https://github.com/OpenShoppingList/open-shopping-list/blob/master/CONTRIBUTING.md)
if you'd like to contribute to **Open Shopping List**.

## Prerequisite Software

Before you can build and test **Open Shopping List**, you must install and configure the
following products on your development machine:

* [**Git**](https://git-scm.com) and/or the [**Github App**](https://desktop.github.com/) (for Mac or Windows). [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.

* [**Node.js**](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.
* [**Cordova**](https://cordova.apache.org/), which is used to build the app for different platforms. You can also obtain it using npm:

  ```shell
  # npm:
  npm install -g cordova

  # Check if it installed succesfully:
  cordova --version
  ```

* [**Sass**](https://sass-lang.com) and/or a UI for it (e.g. [Prepros](https://prepros.io/)) which is a precompiler for `.sass` and `.scss` files. You can also obtain the command line utility using npm, Chocolatey or Homebrew:

  ```shell
  # npm:
  npm install -g sass

  # Chocolatey:
  choco install sass

  # Homebrew:
  brew install sass/sass/sass

  # Check if it installed succesfully:
  sass --version
  ```

## Getting the Sources

Fork and clone the **Open Shopping List** repository:

- Login to your GitHub account or create a new one by following the instructions given [here](https://github.com/signup/free).
- [Fork](http://help.github.com/forking) the [main **open shopping list**
   repository](https://github.com/OpenShoppingList/open-shopping-list).
- Clone your fork of the **open shopping list** repository and define an `upstream` remote pointing back to the **open shopping list** repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/open-shopping-list.git

# Go to the project's directory:
cd open-shopping-list

# Add the main repository as an upstream remote to your repository:
git remote add upstream https://github.com/OpenShoppingList/open-shopping-list.git
```

## Installing NPM Modules

Next, install the NodeJS modules needed to build and test Open Shopping List:

```shell
# Install project dependencies (specified in package.json)
npm install
```

## Building

As we use `.scss` to create our stylesheets, you have to compile those before you can actually build the project. If you use the command line version of [**Sass**](https://sass-lang.com), simply enter these commands inside the project to compile these files into `.css`:

```shell
sass "www/css/style.scss" "www/css/style.css"
sass "www/css/navigation.scss" "www/css/navigation.css"
sass "www/css/lists.scss" "www/css/lists.css"
```

If you use a UI, simply compile all of the `.scss` files listed above. Now, to be able to use **Open Shopping List**, simply add all the platforms you want it to run:

```shell
# Add the platforms you want it to run on (e.g. 'browser'):
cordova platform add <platform>
```

To build and run the app:

```shell
# Build and run the app:
cordova run <platform>

# Just build the app:
cordova build <platform>
```

## Attribution

This Building and Testing open-shopping-list file is adapted and changed from the Angular project, version 1.4,
available at https://github.com/angular/angular/blob/master/docs/DEVELOPER.md
