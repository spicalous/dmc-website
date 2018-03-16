import Route from '@ember/routing/route';

export default Route.extend({

  actions: {

    didTransition() {
      document.querySelector('nav').scrollIntoView();
    }

  }
});
