#!/usr/bin/env node

const cli = require('clui')
const shell = require('shelljs')
const Spinner = cli.Spinner
const clear = require('clear')
const spawn = require('child_process').spawn
const prompts = require('prompts');
const figlet = require('figlet')
const fs = require('fs').promises;
const colors = require('colors');
const oP = require('object-path');

const project = {
  name: 'origin',
  version: '1.0.0',
  description: 'An easy to use CLI tool for creating many projects using the same boiler plate.',
};

/** Utilities */
const log = require('../lib/util/log');
const getInput = require('../lib/util/getInput');
const checkForConfig = require('../lib/util/checkForConfig');

/** Handlers */
const handleConfig = require('../lib/handleConfig');
const handleCreate = require('../lib/handleCreate');

/**
 * Messages to show if no command specified.
 */
const init = async () => {
  clear();

  log('white', '---------------------------------------');
  log(
    'green',
    figlet.textSync(project.name, {
      horizontalLayout: 'full',
    })
  );
  log('white', '---------------------------------------\n');
}

/**
 * Show when command is completed.
 */
const finished = () => {
  log('blue', 'Completed.');
};

const askCMS = () => {
  const questions = [
      {
          name: 'cms',
          type: 'list',
          choices: ['Contentful', 'Prismic', 'WordPress'],
          message: 'Please select the CMS that will be used with this project',
      },
  ]
  return prompts(questions)
}

/**
 * Show the help screen.
 *
 */
const showHelp = () => {
  log('green', 'usage:  origin [command]');
  log('gray', '\thelp')
  log('gray', '\tconfig --repo [repo-url] (Sets the starter repository to use.) ')
  log('gray', '\tconfig --cms [cms] (Sets the CMS to use. Options can be wp, contentful, prismic');
  log('gray', '\tcreate [project-name] [directory] Start the new project setup.')
}


/**
 * If no command passed, show help screen.
 */
const checkArgs = () => {
  if (process.argv.length < 3) {
    return showHelp();
  }
}

const checkCommand = (cmd, config) => {
  if (!cmd) return showHelp();

  switch (cmd) {
    case 'config':
      return handleConfig(config);
      break;
    case 'create':
      return handleCreate(config);
      break;
    case 'help':
    default:
      return showHelp();
  }
}

const validConfig = (conf) => {
  if (!conf) return false;
  if (!conf.cms_choice) return false;
  if (!conf.github_repo_url) return false;

  return true;
}

/* *************************** */
let cms;

(async () => {
  init();

  // Check config.
  const config = await checkForConfig();

  // Get command.
  const command = oP.get(process, 'argv.2', '').toLowerCase();

  // If config is invalid and command isn't to set, run config setup.
  if (command !== 'config' && !validConfig(config)) {
    const answer = await askCMS()
    let { cms } = answer;

    console.log(cms);
  }

  checkArgs();
  const result = await checkCommand(command, config);

  if (!result) return showHelp();


  finished();
})()
