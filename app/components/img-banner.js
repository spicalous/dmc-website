import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  classNames: ['image-banner-container'],

  classNameBindings: ['blur'],

  blur: false,

  didInsertElement() {
    let styles = [`background-image: url('${this.get('src')}');`];
    const backgroundPosition = this.get('backgroundPosition');

    if (backgroundPosition) {
      styles.push(`background-position: ${backgroundPosition};`)
    }

    this.set('imageBannerStyle', htmlSafe(styles.join('')));
  }

});
