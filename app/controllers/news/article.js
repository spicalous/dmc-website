import Controller from '@ember/controller';
import { htmlSafe } from '@ember/template';

export default class NewsArticleController extends Controller {

  get safeContent() {
    return htmlSafe(this.model.content);
  }

}
