<p align="center">
  <a href="" rel="noopener">
  <img width=400px height=170px src="/doc/media/logo.png" alt="Wombo Combo Logo"></a>
</p>

<h3 align="center">Wombo Combo</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-dev-orange.svg)](http://sykesdev.ca/wombo-combo/)
[![Build](https://travis-ci.com/SystemFiles/wombo-combo.svg?branch=master)](https://travis-ci.com/github/SystemFiles/wombo-combo)
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
- [Features](#features)
- [Deploy](#deploy)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

I created this tool as a way to create and manipulate username and password lists as well as combo lists. The goal of this tool it will help make the most comprehensive combo lists for penetration testing, but be simple and accessible through your web browser.

## ✅ Features <a name = "features">

- Simple UI/UX design
- Built on web as CSR web app using React making the application super accessible (unlike most pentesting tools)
- Effective mangling rules for ensuring the most comprehensive password lists based on research into most effective password mangling techniques. (*somewhat limited in current implementation...will be updated in the future with more mangling rules*)
- Small performance requirements to deploy on your own
- Step by Step system to ensure user is presented with all options before generating any list
- Generation of combos handled on express API server so that users machine suffers no performance loss with large combo lists
- Configurable HELM chart for deploying the app on Kubernetes ([Wombo-Combo Chart](https://github.com/SystemFiles/helm-charts/tree/master/charts/wombo-combo)). Usable through Sykesdev HELM repo
- Fully containerized through use of Docker
- Small file size overall (less than 100MB)
- Clean interface for ease-of-use
- Allows users to both copy the entire combo-list into clipboard OR to download the entire list as a formatted text file (`user:pass`)
- More soon 🙏

## 📹Demo
> ![Demo](/doc/media/demo.gif)
*Small Demonstration of Wombo Combos key features* <br/>
To try it yourself (**note**: Due to storage limitations on my host, you may only provide files under 1MB) please check out the [wombo-combo live](https://wc.sykesdev.ca)

## 🚀 Deploy your own! <a name = "deploy"></a>

1. Add the SykesDev HELM Repo: `helm repo add https://systemfiles.github.io/helm-charts/`
2. Update the repo contents: `helm repo update`
3. Install chart on your cluster: `helm install wombo-combo sykesdev/wombo-combo --namespace wombo-combo --values <your_values_file>` or simply `helm install wombo-combo sykesdev/wombo-combo --namespace wombo-combo` if you would like to use default values provided with chart (**NOT RECOMMENDED**)
4. Wait about 2min (MAX) and you should be up and running ✓

## ⛏️ Built Using <a name = "built_using"></a>

- [ReactJS](https://reactjs.org) - Client Framework
- [Create React App](https://create-react-app.dev)
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework

## ✍️ Authors <a name = "authors"></a>

- [@systemfiles](http://sykesdev.ca) - Owner & Maintainer
