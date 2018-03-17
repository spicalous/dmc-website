import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({

  actions: {

    transitionToAndCollapse(route) {
      this.transitionToRoute(route);
      document.querySelector('nav').scrollIntoView();
      Ember.$('.navbar-collapse').collapse('hide');
    }

  }
});
