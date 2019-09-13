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
  const prNumber = eventData.check_suite.pull_requests[0].number;

  core.exportVariable(
    'NETLIFY_URL',
    `https://deploy-preview-${prNumber}--${eventData.repository.name}.netlify.com/`
  );
}
