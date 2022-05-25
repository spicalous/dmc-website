import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class ImgBannerComponent extends Component {

  get style() {
    let styles = [`background-image: url('${this.args.src}');`];
    const backgroundPosition = this.args.backgroundPosition;
    const contain = this.args.contain;
    const noRepeat = this.args.noRepeat;

    if (backgroundPosition) {
      styles.push(`background-position: ${backgroundPosition};`)
    }
    if (contain) {
      styles.push(`background-size: contain;`)
    }
    if (noRepeat) {
      styles.push(`background-repeat: no-repeat;`)
    }

    return htmlSafe(styles.join(''));
  }

}
