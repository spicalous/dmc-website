import $ from 'jquery'
import Controller from '@ember/controller';

export default Controller.extend({

  actions: {

    collapseNav() {
      $('.navbar-collapse').collapse('hide');
    }

  }
});
