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
  console.log('RECEIVED NETLIFY URL AS', process.env.NETLIFY_URL);
  core.exportVariable('CYPRESS_BASE_URL', process.env.NETLIFY_URL);

  const cypressCachePath = path.join(process.env.GITHUB_WORKSPACE, 'cypress-cache');
  const cypressVersion = JSON.parse(fs.readFileSync('package-lock.json')).dependencies.cypress.version;

  core.exportVariable('CYPRESS_CACHE_FOLDER', cypressCachePath);

  getCypress(cypressVersion)
    .then(() => {
      console.info('Installed Cypress!');

      toolCache.cacheDir(
        cypressCachePath,
        'cypress',
        cypressVersion
      )

      exec('./node_modules/.bin/cypress run');
    });
}

function getCypress(version) {
  if (toolCache.find('cypress', version) !== '')
    return;

  return exec(
    'npm',
    ['install', '--no-audit', 'cypress'],
    {
      // env: {
      //   ...process.env,
      //   'CYPRESS_CACHE_FOLDER': cypressCachePath,
      // },
    }
  )
}
