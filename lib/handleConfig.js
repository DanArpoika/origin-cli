const oP = require('object-path');
const writeConfig = require('./util/writeConfig');
const handleConfig = (config) => {
  const action  = oP.get(process, 'argv.3', '').toLowerCase();
  const input   = oP.get(process, 'argv.4');


  console.log(action, input);

  if (!input) {
    return null;
  }

  if (['--repo', '--cms'].indexOf(action) < 0) return null;

  switch (action) {
    case '--repo':
      config.github_repo_url = input;
      break;
    case '--cms':
      config.cms_choice = input;
      break;
  }

  return writeConfig(config);
}

module.exports = handleConfig;
