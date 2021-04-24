import LinkComponent from '@ember/routing/link-component';

export default class LinkToAndScrollComponent extends LinkComponent {

  _invoke() {
    super._invoke(...arguments);
    document.querySelector('nav').scrollIntoView();
  }

}
