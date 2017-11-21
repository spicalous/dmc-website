import Controller from '@ember/controller';

export default Controller.extend({

  selectedAlbum: null,

  actions: {

    selectAlbumAndImage(album, image) {
      this.set('selectedAlbum', album);
      this.set('selectedImage', image);
    }
  }
});
