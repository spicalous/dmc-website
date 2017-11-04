import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about-us');
  this.route('teachings');
  this.route('activities');
  this.route('news');
  this.route('media');
  this.route('contact');
  this.route('faqs');
});

export default Router;
