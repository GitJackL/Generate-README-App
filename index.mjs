// gives access to dependencies needed
import fs from 'fs';
import inquirer from 'inquirer';
import ejs from 'ejs'

//Reads content of template.md and turns it into a string
const template = fs.readFileSync('template.md', 'utf8');

//Prompt will populate questions in the terminal
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

  // Takes user responses and used ejs to popuate template with users answers
  .then((answers) => {
    const licenseBadge = renderLicenseBadge(answers.projectLicense);
    const markdown = ejs.render(template, {...answers, licenseBadge});
    fs.writeFileSync('README.md', markdown);
  });

  // Gets license badges based on user choice
function renderLicenseBadge(license) {
  let color;
  let link;

  switch (license) {
    case 'MIT':
      color = 'yellow';
      link = 'https://opensource.org/licenses/MIT';
      break;
    case 'Apache-2.0':
      color = 'orange';
      link = 'https://opensource.org/licenses/Apache-2.0';
      break;
    case 'GPL-3.0':
      color = 'blue';
      link = 'https://www.gnu.org/licenses/gpl-3.0';
      break;
    default:
      color = 'lightgrey';
      link = '';
  }

  return `[![License: ${license}](https://img.shields.io/badge/License-${license}-${color}.svg)](${link})`;
}
