import Model, { attr } from '@ember-data/model';

export default class NewsArticleModel extends Model {
  @attr('string') title;
  @attr('number') year;
  @attr('number') month;
  @attr('number') day;
  @attr('string') coverImage;
  @attr('string') description;
}
