'use strict';

const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const { exec } = require('@actions/exec');
const toolCache = require('@actions/tool-cache');

const baseUrl = core.getInput('base-url', { required: true });

const cypress = {
  version: JSON.parse(fs.readFileSync('package-lock.json')).dependencies.cypress.version,
  cachePath: path.join(process.env.GITHUB_WORKSPACE, 'cypress-cache'),
};

const runEnvironment = {
  ...process.env,
  'CI': 'true',
  'CYPRESS_CACHE_FOLDER': cypress.cachePath,
};

getCypress(cypress.version)
  .then(() => {
    toolCache.cacheDir(
      cypress.cachePath,
      'cypress',
      cypress.version
    )

    return exec(
      './node_modules/.bin/cypress',
      ['run', '--config', `baseUrl=${baseUrl}`],
      { env: runEnvironment }
    )
  })
  .catch(error => core.setFailed(error.message));

function getCypress(version) {
  if (toolCache.find('cypress', version) !== '')
    return;

  return exec(
    'npm',
    ['install', '--no-audit', 'cypress'],
    { env: runEnvironment }
  );
}
