import Route from '@ember/routing/route';

export default class NewsRoute extends Route {

  model() {
    return this.store.findAll('news-article');
  }

}
