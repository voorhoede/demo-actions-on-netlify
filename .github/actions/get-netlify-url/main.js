'use strict';

const fs = require('fs');

const core = require('@actions/core');

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}

function main() {
  const eventData = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH));
  const pullRequestNumber = eventData.check_suite.pull_requests[0].number;
  const siteName = core.getInput('site-name') || eventData.repository.name;

  core.debug(`Context: ${pullRequestNumber ? 'pull request' : 'none'}`);
  core.debug(`Site name: ${siteName}`);

  core.setOutput(
    'url',
    `https://deploy-preview-${pullRequestNumber}--${siteName}.netlify.com/`
  );
}
