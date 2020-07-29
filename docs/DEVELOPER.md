# Building and Testing open-shopping-list

This document describes how to set up your development environment to build and test the **open shopping list**.
It also explains the basic mechanics of using `git`, `node`, and `yarn`.

* [Prerequisite Software](#prerequisite-software)
* [Getting the Sources](#getting-the-sources)
* [Installing NPM Modules](#installing-npm-modules)
* [Building](#building)

See the [contribution guidelines](https://github.com/OpenShoppingList/open-shopping-list/blob/master/CONTRIBUTING.md)
if you'd like to contribute to **open-shopping-list**.

## Prerequisite Software

Before you can build and test **open-shopping-list**, you must install and configure the
following products on your development machine:

* [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.

* [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.

## Getting the Sources

Fork and clone the **open shopping list** repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main **open shopping list**
   repository](https://github.com/OpenShoppingList/open-shopping-list).
3. Clone your fork of the **open shopping list** repository and define an `upstream` remote pointing back to
   the **open shopping list** repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/open-shopping-list.git

# Go to the Angular directory:
cd open-shopping-list

# Add the main Angular repository as an upstream remote to your repository:
git remote add upstream https://github.com/OpenShoppingList/open-shopping-list.git
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test open-shopping-list:

```shell
# Install Angular project dependencies (package.json)
yarn install
```

## Building

As we use scss to create our stylesheets, you need to compile these too.

you can install the sass compiler via npm, the Chocolatey package manager or Homebrew:

```shell
# npm
npm install -g sass

# Chocolatey
choco install sass

# Homebrew
brew install sass/sass/sass
```

Now you can compile the style.scss file with sass:
```shell
sass open-shopping-list/www/css/style.scss open-shopping-list/www/css/style.css
```

To be able to use **open shopping list** run:

```shell
npm install cordova

# Add a platform to your project to test
cordova platform add <platform>
```

To build the app run:

```shell
cordova build <platform>
```

## Attribution

This Building and Testing open-shopping-list file is adapted and changed from the Angular project, version 1.4,
available at https://github.com/angular/angular/blob/master/docs/DEVELOPER.md