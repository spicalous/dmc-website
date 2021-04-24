import Controller from '@ember/controller';

export default class NewsIndexController extends Controller {

  get recentToOldArticles() {
    return this.model.toArray().reverse();
  }

}
