# OrangeHRM Automation with Cypress

This repository contains automated tests for the OrangeHRM application using Cypress. The aim is to ensure the functionality and stability of the application through automated testing.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)

## Introduction

OrangeHRM is a leading open-source human resource management software. This project automates various functionalities of the OrangeHRM application to ensure smooth user experiences and minimize regression issues.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14.x or later)
- npm (Node package manager)

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/abhishek-kolapkar/OrangeHRM-Automation.git

  cd OrangeHRM-Automation
```

2. Install the required dependencies:

```bash
  npm install
```

## Folder Structure

```
  OrangeHRM-Automation/
  |
  ├── cypress/
  |   ├── fixtures/
  |   |   ├── dataFile1.json
  |   |   ├── dataFile2.json
  |   |
  |   ├── support
  |       ├── page-objects
  |       |   ├── module/
  |       |       ├── pageObj.js
  |       |
  |       ├── command.js
  |       ├── e2e.js
  |
  ├── integration/
  |   ├── module/
  |       ├── spec.cy.js
  |
  ├── node_modules/
  |
  ├── cypress.config.js
  ├── package.json
  ├── README.md
  |
```

## Running Tests

To run the tests, use the following command:

```bash
  npx cypress open
```

This will open the Cypress Test Runner. From there, you can select the test files you want to run.

For headless execution, you can run:

```bash
  npx cypress run
```
