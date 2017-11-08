import Component from '@ember/component';

export default Component.extend({

  classNames: ['image-banner'],

  didInsertElement() {
    this.$().attr('style', `background-image: url('${this.get('src')}');`);
  }
});
