const core = require('@actions/core')
const fs = require('fs')

function getEventData() {
  return JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
}

const eventData = getEventData()

core.debug(`Event data:`)
core.debug(JSON.stringify(eventData, null, 2))
core.debug(`check_suite`)
core.debug(JSON.stringify(eventData.check_suite, null, 2))