import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MediaController extends Controller {

  @tracked selectedAlbum = null;
  @tracked selectedImage = null;

  @action
  selectAlbumAndImage(album, image) {
    this.selectedAlbum = album;
    this.selectedImage = image;
  }
}
