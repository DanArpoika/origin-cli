const cli = require('clui');
const Spinner = cli.Spinner;
const spawn = require('child_process').spawn;
const oP = require('object-path');
const prompts = require('prompts');
const colors = require('colors');
const toSlug = require('./util/toSlug');
const log = require('./util/log');
const mkDir = require('./util/mkDir');


const installHelper = (command, onSuccess, spinner) => {
  return new Promise((resolve, reject) => {
      var process = spawn(command, { shell: true })
      spinner.start()
      process.on('exit', () => {
          spinner.stop()
          onSuccess()
          resolve()
      })
  })
}

const installProject = async (dir = '') => {
  const spinner = new Spinner('Cloning starter project..')
  return installHelper(
      `git clone https://github.com/ElegantSeagulls/nextjs-starter.git ${dir}`,
      () => console.log(colors.green('Starter project cloned 👍')),
      spinner
  )
}

const installNodeModules = async (dir = '.') => {
  const spinner = new Spinner('Install starter project node modules...')
  return installHelper(
      `cd ${dir} && yarn install`,
      () => console.log(colors.green('Starter project node modules installed. 👍')),
      spinner
  )
}

const askIsStatic = () => {
  const question = {
    name: 'notStatic',
    type: 'confirm',
    initial: 'y',
    message: 'Will this project run on a server in production?',
  };

  return prompts([question])
}

const removeScriptsFolder = async = (dir = '') => {
  const spinner = new Spinner('Removing unneeded scripts folder...')
  return installHelper(
      `cd ${dir} && rm -rf ./scripts`,
      () => console.log(colors.green('Scripts folder removed 👍')),
      spinner
  )
}

const handleCreate = async (config) => {
  const projectName  = oP.get(process, 'argv.3', null);
  let projectDir   = oP.get(process, 'argv.4', null);

  if (!projectName) {
    log('red', 'Invalid.');
    process.exit()
  }

  const projectSlug  = toSlug(projectName);

  if (!projectDir) {
    projectDir = projectSlug;
    mkDir(projectSlug);
  }


  await installProject(projectDir);
  await installNodeModules(projectDir);

  /**
   * Check with team on using Node v12.10 which
   * allows recursively remove directory.
  */
  const { notStatic } = await askIsStatic();

  if (notStatic) {
    await removeScriptsFolder(projectDir);
  }

  return true;

  //Static? If not remove /scripts
  // ENV for cms
};

module.exports = handleCreate;
