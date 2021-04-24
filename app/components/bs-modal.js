import jQuery from 'jquery'
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BsModalComponent extends Component {

  @action
  onDidInsert() {
    const modal = jQuery('.modal');
    modal.modal('show');
    modal.on('hidden.bs.modal', this.onDismissed.bind(this));
  }

  @action
  onWillDestroy() {
    jQuery('.modal').off('hidden.bs.modal');
  }

  onDismissed() {
    if (this.args.onDismissed) {
      this.args.onDismissed();
    }
  }

}
