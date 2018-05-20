import { htmlSafe } from '@ember/string';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  safeContent: computed('model.content', function() {
    return htmlSafe(this.get('model.content'));
  })

});
