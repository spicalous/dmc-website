import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({

  actions: {

    collapse() {
      Ember.$('.navbar-collapse').collapse('hide');
    }

  }
});
