import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  dateText: computed(function() {
    const article = this.get('article');
    return `${article.get('day')}/${article.get('month')}/${article.get('year')}`;
  })

});
