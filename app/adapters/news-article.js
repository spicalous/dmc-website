import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({

  namespace: 'assets/news',

  urlForFindAll() {
    let baseUrl = this.buildURL();
    return `${baseUrl}/all.json`;
  },

  urlForQueryRecord({ year, month, day, article }) {
    let baseUrl = this.buildURL();
    if (year.length < 5 && month.length < 3 && day.length < 3 && article.length < 3) {
      return `${baseUrl}/${year}/${month}/${day}/${article}.json`;
    }
    return `${baseUrl}`;
  }

});
