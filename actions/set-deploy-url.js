const core = require('@actions/core')
const fs = require('fs')

function getEventData() {
  return JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
}

const eventData = getEventData()
const prNumber = eventData.check_suite.pull_requests[0].number
const deployUrl = `https://deploy-preview-${prNumber}--${eventData.repository.name}.netlify.com/`

core.debug(`deploy url: ${deployUrl}`)

// https://github.com/actions/toolkit/tree/master/packages/core#exporting-variables
core.exportVariable('DEPLOY_URL', deployUrl)
core.exportVariable('CYPRESS_BASE_URL', deployUrl)
