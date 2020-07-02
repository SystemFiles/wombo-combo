<p align="center">
  <a href="" rel="noopener">
  <img width=400px height=200px src="/doc/media/logo.png" alt="Wombo Combo Logo"></a>
</p>

<h3 align="center">Wombo Combo</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-live-success.svg)](http://sykesdev.ca/wombo-combo/)
[![GitHub Issues](https://img.shields.io/github/issues/systemfiles/wombo-combo.svg)](https://github.com/SystemFiles/wombo-combo/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/systemfiles/wombo-combo.svg)](https://github.com/SystemFiles/wombo-combo/pulls)
[![Code Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/standard/eslint-config-standard/blob/master/README.md)
[![License](https://img.shields.io/badge/license-apache-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Combo Lists made easy!
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

I created this tool as a way to create and manipulate username and password lists as well as combo lists. The goal of this tool it will help make the most comprehensive combo lists for penetration testing, but be simple and accessible through your web browser.

## 🏁 Getting Started <a name = "getting_started"></a>

**Want to run your own copy?**
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone the repository `git clone https://github.com/SystemFiles/wombo-combo.git`
2. `npm install` in each `/client/` and `/server/`.
3. Create a `.env` file at the root of `/server/` (`touch .env`) and fill with the following required vars
  - TBD
4. To run in production
  - Navigate to `/client/` and run `npm build` to build the project
  - After the optimized build has been generated you may serve the application using any static web server. I recommend node serv which can be installed with `npm install -g serve` and run with `serve -s /build -l <port>`.
5. To run in dev
  - Navigate to `/client/` and run `npm start`
  - Do the same in `/server/` or run `node app.js`
6. Done 🙂

### Prerequisites

- Only need `npm`... then do `npm install`

### Viewing

Go to the [Demo Site](http://sykesdev.ca/wombo-combo/)

## 🔧 Running the tests <a name = "tests"></a>

### Integration tests

run `npm run test`

### Coding style tests

I adhere to the standard javascript coding style defined [here](https://github.com/standard/eslint-config-standard/blob/master/README.md). If you plan on contributing please lint your code using `npm run lint`

## 🎈 Usage <a name="usage"></a>

TBD

## 🚀 Deployment <a name = "deployment"></a>

`npm run build` and copy `/build` to your web server. See [Getting Started](#getting_started) for more info

## ⛏️ Built Using <a name = "built_using"></a>

- [ReactJS](https://reactjs.org) - Client Framework
- [Create React App](https://create-react-app.dev)
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework

## ✍️ Authors <a name = "authors"></a>

- [@systemfiles](http://sykesdev.ca) - Owner & Maintainer
