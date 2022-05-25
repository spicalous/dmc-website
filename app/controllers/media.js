import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MediaController extends Controller {

  @service ui;
  @tracked selectedAlbum = null;
  @tracked selectedImage = null;

  @action
  selectAlbumAndImage(album, image) {
    this.selectedAlbum = album;
    this.selectedImage = image;
  }
}
