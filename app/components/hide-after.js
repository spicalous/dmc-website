import Component from '@glimmer/component';

export default class HideAfterComponent extends Component {

  get hide() {
    const expiry = new Date(this.year, this.month, this.day);
    return Date.now() > expiry.getTime();
  }

}
