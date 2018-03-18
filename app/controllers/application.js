import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({

  actions: {

    collapseNav() {
      Ember.$('.navbar-collapse').collapse('hide');
    }

  }
});
