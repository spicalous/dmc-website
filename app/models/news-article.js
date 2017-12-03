import DS from 'ember-data';
import { computed } from '@ember/object';

const SHORT_DESCRIPTION_LENGTH = 140;

export default DS.Model.extend({

  title: DS.attr('string'),
  year: DS.attr('number'),
  month: DS.attr('number'),
  day: DS.attr('number'),

  /**
   *  Array of paragraphs
   */
  text: DS.attr(),

  /**
   *  Array of image sources
   */
  images: DS.attr(),

  coverImage: computed('images.[]', function() {
    return this.get('images')[0];
  }),

  shortDescription: computed('text.[]', function() {
    const text = this.get('text').join(' ').substr(0, SHORT_DESCRIPTION_LENGTH);
    return text.length < SHORT_DESCRIPTION_LENGTH ? text : text + '...';
  })


});
