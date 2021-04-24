import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';

export default class NewsArticleController extends Controller {

  get safeContent() {
    return htmlSafe(this.model.content);
  }

}
