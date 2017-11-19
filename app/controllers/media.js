import Controller from '@ember/controller';

export default Controller.extend({

  selectedAlbum: null,

  actions: {

    selectAlbum(album) {
      this.set('selectedAlbum', album);
    }
  }
});
