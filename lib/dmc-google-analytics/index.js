/* eslint-env node */
'use strict';

module.exports = {
  name: 'dmc-google-analytics',

  isDevelopingAddon() {
    return true;
  },

  contentFor(type, config) {

    if (type === 'head' && config.googleAnalyticsId) {

      return `<!-- Global site tag (gtag.js) - Google Analytics -->
              <script async src="https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${config.googleAnalyticsId}');
              </script>`;
    }
  }

};
