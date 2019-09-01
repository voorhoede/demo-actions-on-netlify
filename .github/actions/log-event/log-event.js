const core = require('@actions/core')
const fs = require('fs')

function getEventData() {
  return JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
}

core.debug(`Event data: ${JSON.stringify(getEventData())}`)