/* eslint-env node */
'use strict';

module.exports = {
  name: 'dmc-google-analytics',

  isDevelopingAddon() {
    return true;
  },

  contentFor(type, config) {

    if (type === 'head' && config.googleAnalyticsId) {
      return `<script async src="https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}"></script>`;
    }
  }

};
