import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  year: DS.attr('number'),
  month: DS.attr('number'),
  day: DS.attr('number'),
  coverImage: DS.attr('string'),
  description: DS.attr('string')

});
