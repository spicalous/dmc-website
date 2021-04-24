import jQuery from 'jquery'
import RSVP from 'rsvp';
import Route from '@ember/routing/route';

export default class NewsArticleRoute extends Route {

  model(params) {
    const { year, month, day, article } = params;

    return RSVP.hash({
      data: this.store.queryRecord('news-article', params),
      content: jQuery.get(`assets/news/${year}/${month}/${day}/${article}.html`)
    });
  }

}
