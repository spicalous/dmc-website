import { assert } from '@ember/debug';
import Route from '@ember/routing/route';
import { scheduleOnce } from '@ember/runloop';

export function initialize(app) {
  const { googleAnalyticsId } = app.resolveRegistration('config:environment');

  assert('Missing googleAnalyticsId in config/environment.', !!googleAnalyticsId);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', googleAnalyticsId);

  Route.reopen({
    actions: {
      didTransition(info) {
        this._super (...arguments);

        scheduleOnce('afterRender', this, () => {
          gtag('config', googleAnalyticsId, {
            'page_path': this.get('router.url') || '/'
          });
        });

      }
    }
  });
}

export default {
  initialize
};
