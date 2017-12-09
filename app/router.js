import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about-us');
  this.route('teachings', function() {
    this.route('meditation-benefits');
  });
  this.route('activities', function() {
    this.route('dhammachai-dhutanga');
    this.route('magha-puja');
    this.route('earth-day');
    this.route('visakha-bucha');
    this.route('kathina');
    this.route('alms-offering');
    this.route('pali-commemoration');
  });
  this.route('news', function() {
    this.route('article', { path: ':year/:month/:day/:article' })
  });
  this.route('media');
  this.route('contact');
  this.route('faqs');
});

export default Router;
