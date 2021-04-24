import jQuery from 'jquery'
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {

  @action
  collapseNav() {
    jQuery('.navbar-collapse').collapse('hide');
  }

}
