const fs = require('fs').promises;
const os = require('os');

const writeConfig = async (config) => {
  const homeDir = `${os.homedir()}/.origin.json`;

  console.log(config);

  try {
    await fs.writeFile(homeDir, JSON.stringify(config), 'utf8');
  } catch (writeError) {
    throw new Error (writeError);
  }
}

module.exports = writeConfig;
