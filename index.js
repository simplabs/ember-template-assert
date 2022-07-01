'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },

  setupPreprocessorRegistry(type, registry) {
    const plugin = this._buildPlugin();
    plugin.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildPlugin',
      params: {},
    };
    registry.add('htmlbars-ast-plugin', plugin);
  },

  _buildPlugin() {
    const emberTemplateAssertTransform = require('./lib/ast-transform');

    return {
      name: 'ember-template-assert',
      plugin: emberTemplateAssertTransform,
      baseDir: emberTemplateAssertTransform.baseDir,
      cacheKey: emberTemplateAssertTransform.cacheKey,
    };
  },
};
