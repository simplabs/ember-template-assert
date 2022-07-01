'use strict';

const Funnel = require('broccoli-funnel');

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

  treeForAddon(tree) {
    let app = this._findHost();
    if (!app.tests) {
      tree = new Funnel(tree, {
        exclude: ['helpers/assert.js'],
      });
    }

    return this._super.treeForAddon.call(this, tree);
  },
};
