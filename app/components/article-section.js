import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNameBindings: ['isImage:text-center'],

  isImage: computed('data', function() {
    return this.get('data').indexOf('assets/images/news') === 0;
  })

});
