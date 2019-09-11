'use strict';

const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const { exec } = require('@actions/exec');
const toolCache = require('@actions/tool-cache');

/*
- Get URL: netlify url from eventData (move to separate action)
- Install: npm install cypress
- Run tests: ./node_modules/.bin/cypress run
*/

function getEventData() {
  return JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
}

function main() {
  const eventData = getEventData();
  const prNumber = eventData.check_suite.pull_requests[0].number;
  const deployUrl = `https://deploy-preview-${prNumber}--${eventData.repository.name}.netlify.com/`;

  core.debug(`deploy url: ${deployUrl}`);

  core.exportVariable('DEPLOY_URL', deployUrl)
  core.exportVariable('CYPRESS_BASE_URL', deployUrl)

  const cypressCachePath = path.join(process.env.GITHUB_WORKSPACE, 'cypress-cache');
  core.debug(`cypress cache path: ${cypressCachePath}`);
  core.exportVariable('CYPRESS_CACHE_FOLDER', cypressCachePath);

  return exec(
    'npm',
    ['install', '--no-audit', 'cypress'],
    {
      env: {
        ...process.env,
        'CYPRESS_CACHE_FOLDER': cypressCachePath,
      },
    }
  )
    .then(() =>
      toolCache.cacheDir(
        cypressCachePath,
        'cypress',
        JSON.parse(fs.readFileSync('package-lock.json')).dependencies.cypress.version
      )
    )
    .then(() => {
      const allVersions = tc.findAllVersions('cypress');
      core.debug(`Versions of node available: ${allVersions}`);
    })
}

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}
