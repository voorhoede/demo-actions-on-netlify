'use strict';

const fs = require('fs');

const core = require('@actions/core');

const eventData = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH));
const pullRequestNumber = eventData.check_suite.pull_requests[0].number;

const siteName = core.getInput('site-name') || eventData.repository.name;
const basicAuthUsername = core.getInput('basic-auth-username');
const basicAuthPassword = core.getInput('basic-auth-password');
const basicAuth = basicAuthUsername && basicAuthPassword
  ? `${basicAuthUsername}:${basicAuthPassword}@`
  : '';

core.debug(`Context: ${pullRequestNumber ? 'pull request' : 'none'}`);
core.debug(`Site name: ${siteName}`);

core.setOutput(
  'url',
  pullRequestNumber
    ? `https://${basicAuth}deploy-preview-${pullRequestNumber}--${siteName}.netlify.com/`
    : `htttps://${basicAuth}${siteName}.netlify.com/`
);
