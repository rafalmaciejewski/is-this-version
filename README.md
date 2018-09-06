# is-this-version :question:

[![npm version](https://badge.fury.io/js/is-this-version.svg)](https://badge.fury.io/js/is-this-version)
[![Build Status](https://travis-ci.com/rafalmaciejewski/is-this-version.svg?branch=master)](https://travis-ci.com/rafalmaciejewski/is-this-version)
[![Dependencies](https://img.shields.io/david/rafalmaciejewski/is-this-version.svg?style=flat-square)](https://david-dm.org/rafalmaciejewski/is-this-version)
[![Coverage Status](https://coveralls.io/repos/github/rafalmaciejewski/is-this-version/badge.svg?branch=master)](https://coveralls.io/github/rafalmaciejewski/is-this-version?branch=master)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

---

CLI tool that checks if your package version is set correctly.

This tool was made to be used in some deployment pipelines during verify stages.

---

## Installation

```shell
$ npm install -g is-this-version
```


## Usage

If installed globally, `is-this-version` will be available as a cli command. This command should be executed from a root directory of a project to be verified.

Only argument that needs to passed is a version number.

```shell
$ is-this-version 1.0.1
```

If there will be a mismatch in either package.json or package-lock.json the above command will return an error exit code.
