'use strict';

module.exports = {
  extends: 'recommended',
  overrides: [
    {
      files: [
        'app/templates/application.hbs'
      ],
      rules: {
        'no-unknown-arguments-for-builtin-components': false
      }
    }
  ]
};
