const uswds = require('@uswds/compile')

/**
 * USWDS version
 */
uswds.settings.version = 3

/**
 * Exports
 */

exports.init = uswds.init
exports.compile = uswds.compile
