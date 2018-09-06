# is-this :question:

[![npm version](https://badge.fury.io/js/is-this.svg)](https://badge.fury.io/js/is-this)
[![Build Status](https://travis-ci.com/rafalmaciejewski/is-this.svg?branch=master)](https://travis-ci.com/rafalmaciejewski/is-this)
[![Dependencies](https://img.shields.io/david/rafalmaciejewski/is-this.svg?style=flat-square)](https://david-dm.org/rafalmaciejewski/is-this)
[![Coverage Status](https://coveralls.io/repos/github/rafalmaciejewski/is-this/badge.svg?branch=master)](https://coveralls.io/github/rafalmaciejewski/is-this?branch=master)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

---

CLI tool that checks if your package version is set correctly.

This tool was made to be used in some deployment pipelines during verify stages.

---

## Installation

```shell
$ npm install -g is-this
```


## Usage

If installed globally, `is-this` will be available as a cli command. This command should be run from a root directory of a project to be verified.

Only argument that needs to passed is a version number.

```shell
$ is-this 1.0.1
```

If there will be a mismatch in either package.json or package-lock.json the above command will return an error exit code.
