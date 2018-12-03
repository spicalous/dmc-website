import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  classNames: ['image-banner'],

  attributeBindings: ['style'],

  didInsertElement() {
    let styles = [`background-image: url('${this.src}');`];
    const backgroundPosition = this.backgroundPosition;
    const contain = this.contain;
    const noRepeat = this.noRepeat;

    if (backgroundPosition) {
      styles.push(`background-position: ${backgroundPosition};`)
    }
    if (contain) {
      styles.push(`background-size: contain;`)
    }
    if (noRepeat) {
      styles.push(`background-repeat: no-repeat;`)
    }

    this.set('style', htmlSafe(styles.join('')));
  }

});
