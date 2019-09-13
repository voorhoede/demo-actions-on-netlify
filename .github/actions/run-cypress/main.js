'use strict';

const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const { exec } = require('@actions/exec');
const toolCache = require('@actions/tool-cache');

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}

function main() {
  const baseUrl = core.getInput('base-url', { required: true });

  const cypressCachePath = path.join(process.env.GITHUB_WORKSPACE, 'cypress-cache');
  const cypressVersion = JSON.parse(fs.readFileSync('package-lock.json')).dependencies.cypress.version;

  core.exportVariable('CYPRESS_CACHE_FOLDER', cypressCachePath);

  getCypress(cypressVersion)
    .then(() => {
      toolCache.cacheDir(
        cypressCachePath,
        'cypress',
        cypressVersion
      )

      exec(`./node_modules/.bin/cypress run --config baseUrl=${baseUrl}`);
    });
}

function getCypress(version) {
  if (toolCache.find('cypress', version) !== '')
    return;

  return exec('npm install --no-audit cypress');
}
