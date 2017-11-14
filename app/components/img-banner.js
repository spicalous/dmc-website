import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  classNames: ['image-banner'],

  attributeBindings: ['style'],

  didInsertElement() {
    let styles = [`background-image: url('${this.get('src')}');`];
    const backgroundPosition = this.get('backgroundPosition');

    if (backgroundPosition) {
      styles.push(`background-position: ${backgroundPosition};`)
    }

    this.set('style', htmlSafe(styles.join('')));
  }

});
