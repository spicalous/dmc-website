import Component from '@glimmer/component';

export default class ArticleCardComponent extends Component {

  get dateText() {
    const article = this.args.article;
    return `${article.day}/${article.month}/${article.year}`;
  }

}
