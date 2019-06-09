import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  recentToOldArticles: computed('model', function() {
    return this.get('model').toArray().reverse();
  })

});
