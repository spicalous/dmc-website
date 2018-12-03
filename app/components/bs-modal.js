import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {
    const modal = this.$('.modal');
    modal.modal('show');
    modal.on('hidden.bs.modal', this.onDismissed);
  },

  willDestroyElement() {
    const modal = this.$('.modal');
    modal.off('hidden.bs.modal');
  },

  onDismissed() {
    //empty by default
  }

});
