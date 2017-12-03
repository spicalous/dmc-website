import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return {
      bhuddistCeremonies: [
        {
          cardImage: 'assets/images/activities/dhammachai-dhutanga_card.jpg',
          title: 'DHAMMACHAI DHUTANGA',
          shortDescription: 'Month-long mindfulness training',
          link: 'activities'
        },
        {
          cardImage: 'assets/images/activities/magha-puja_card.jpg',
          title: 'MAGHA PUJA',
          shortDescription: 'Inner light leads to a brighter world',
          link: 'activities'
        }
      ]
    }
  }

});
