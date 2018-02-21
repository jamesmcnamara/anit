var path = require('path')

module.exports = {
  aliases: {
    _: 'node_modules/lodash',
    _f: 'node_modules/lodash/fp',
  },
  useRelativePaths({ pathToImportedModule, pathToCurrentFile }) {
    return path.parse(pathToImportedModule).dir === path.parse(pathToCurrentFile).dir
  },

  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/src\//, '')
  },
}
