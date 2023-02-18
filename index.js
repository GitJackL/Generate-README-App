const fs = require('fs');
const inquirer = require('inquirer');
const ejs = require('ejs');

const template = fs.readFileSync('template.md', 'utf8');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'projectTitle',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Please provide a description for your project:',
    },
    {
      type: 'input',
      name: 'projectInstallation',
      message: 'Please provide installation instructions for your project:',
    },
    {
      type: 'input',
      name: 'projectUsage',
      message: 'Please provide usage instructions for your project:',
    },
    {
      type: 'list',
      name: 'projectLicense',
      message: 'What license do you want to use for your project?',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0'],
    },
    {
      type: 'input',
      name: 'projectContributing',
      message: 'Please provide guidelines for contributing to your project:',
    },
    {
      type: 'input',
      name: 'projectTests',
      message: 'Please provide instructions for running tests for your project:',
    },
    {
      type: 'input',
      name: 'userName',
      message: 'What is your GitHub username?',
    },
    {
      type: 'input',
      name: 'userEmail',
      message: 'What is your email address?',
    },
  ])
  .then((answers) => {
    const markdown = ejs.render(template, answers);
    fs.writeFileSync('README.md', markdown);
  });