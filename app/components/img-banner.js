import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  classNames: ['image-banner'],

  attributeBindings: ['style'],

  didInsertElement() {
    let styles = [`background-image: url('${this.get('src')}');`];
    const backgroundPosition = this.get('backgroundPosition');
    const contain = this.get('contain');

    if (backgroundPosition) {
      styles.push(`background-position: ${backgroundPosition};`)
    }
    if (contain) {
      styles.push(`background-size: contain;`)
    }

    this.set('style', htmlSafe(styles.join('')));
  }

});
