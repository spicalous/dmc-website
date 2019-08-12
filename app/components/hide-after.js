import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNameBindings: ['hide:d-none'],

  hide: computed(function() {
    const expiry = new Date(this.year, this.month, this.day);
    return Date.now() > expiry.getTime();
  })

});
