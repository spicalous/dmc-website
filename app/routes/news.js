import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.get('store').findAll('news-article');
  },

  actions: {

    didTransition() {
      document.querySelector('nav').scrollIntoView();
    }

  }
});
