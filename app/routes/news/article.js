import $ from 'jquery';
import RSVP from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    const { year, month, day, article } = params;

    return RSVP.hash({
      data: this.store.queryRecord('news-article', params),
      content: $.get(`assets/news/${year}/${month}/${day}/${article}.html`)
    });
  }

});
