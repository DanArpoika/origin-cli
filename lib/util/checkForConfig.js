const os = require('os');
const fs = require('fs').promises;
const writeConfig = require('./writeConfig');

const checkForConfig = async () => {
  const configSchema = {
    github_repo_url: '',
    cms_choice: '',
  };

  const homeDir = `${os.homedir()}/.origin.json`;

  let data = configSchema;

  try {
    data = await fs.readFile(homeDir, 'utf8');
    data = JSON.parse(data);

    configFound = true;
  } catch (fileError) {
    writeConfig(configSchema);
  }

  return data;
}

module.exports = checkForConfig;
