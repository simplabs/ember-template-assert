'use strict';

module.exports = function emberTemplateAssertTransform(env) {
  let visitor = {};
  if (env.isProduction) {
    visitor = {
      MustacheStatement(node) {
        if (node.path.original === 'assert') {
          return null;
        }
      },
    };
  }

  return {
    name: 'ember-template-assert',
    visitor,
  };
};

module.exports.baseDir = function () {
  return __dirname;
};

module.exports.cacheKey = function () {
  return 'ember-template-assert';
};
