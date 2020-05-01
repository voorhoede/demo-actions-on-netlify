# Demo Actions on Netlify

**Demo running GitHub actions on Netlify deploy previews.**

![GitHub PR checks for Netlify deploy and audits](https://raw.githubusercontent.com/voorhoede/demo-actions-on-netlify/master/docs/github-check-audit-netlify-deploy.png)

## Setup
* This [GitHub workflow](.github/workflows/audit-deploy.yml) runs `on: pull_request`.
* The audit runs on the deploy preview which is set before the audit runs: `https://deploy-preview-${prNumber}--${siteName}.netlify.app/`.

## Run end-to-end (E2E) tests on Netlify deploy preview using Cypress
* Sets `CYPRESS_BASE_URL` to the deploy url.
* Runs Cypress on this url.

nope
