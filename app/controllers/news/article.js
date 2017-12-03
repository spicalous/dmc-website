import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  articleSections: computed('model.text.[]', 'model.images.[]', function() {
    const text = this.get('model.text');
    const images = this.get('model.images');
    const textLength = text.get('length');
    const imageLength = images.get('length');
    const result = [];

    for (let i = 0; i < textLength; i++) {
      result.push(text.get(i));
      if (images.get(i)) {
        result.push(images.get(i));
      }
    }

    if (images.get(textLength)) {
      result.concat(images.slice(textLength, imageLength));
    }

    return result;
  })

});
