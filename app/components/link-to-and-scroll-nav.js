import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({

  _invoke() {
    this._super(...arguments);
    document.querySelector('nav').scrollIntoView();
  }

});
