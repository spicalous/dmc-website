import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';

export default class NewsArticleAdapter extends JSONAPIAdapter {

  namespace = 'assets/news';

  urlForFindAll() {
    let baseUrl = this.buildURL();
    return this._addRootIfNotEmpty(`${baseUrl}/all.json`);
  }

  urlForQueryRecord({ year, month, day, article }) {
    let baseUrl = this.buildURL();
    if (year.length < 5 && month.length < 3 && day.length < 3 && article.length < 3) {
      return this._addRootIfNotEmpty(`${baseUrl}/${year}/${month}/${day}/${article}.json`);
    }
    return this._addRootIfNotEmpty(baseUrl);
  }

  _addRootIfNotEmpty(url) {
    if (config.rootURL !== '/') {
      return `${config.rootURL}/${url}`;
    }
    return url;
  }

}
