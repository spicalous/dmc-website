import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return {
      bhuddistCeremonies: [
        {
          cardImage: 'assets/images/activities/dhammachai-dhutanga_card.jpg',
          title: 'DHAMMACHAI DHUTANGA',
          shortDescription: 'Month-long mindfulness training',
          link: 'activities.dhammachai-dhutanga'
        },
        {
          cardImage: 'assets/images/activities/magha-puja_card.jpg',
          title: 'MAGHA PUJA',
          shortDescription: 'Inner light leads to a brighter world',
          link: 'activities.magha-puja'
        },
        {
          cardImage: 'assets/images/activities/earth-day_card.jpg',
          title: 'EARTH DAY',
          shortDescription: 'Protect your mind to protect the earth',
          link: 'activities.earth-day'
        },
        {
          cardImage: 'assets/images/activities/visakha-bucha_card.jpg',
          title: 'VISAKHA BUCHA',
          shortDescription: 'Buddha Day',
          link: 'activities.visakha-bucha'
        },
        {
          cardImage: 'assets/images/activities/kathina_card.jpg',
          title: 'KATHINA',
          shortDescription: 'Robe offering',
          link: 'activities.kathina'
        },
        {
          cardImage: 'assets/images/activities/alms-offering_card.jpg',
          title: 'ALMS OFFERING',
          shortDescription: '',
          link: 'activities.alms-offering'
        },
        {
          cardImage: 'assets/images/activities/pali-commemoration_card.jpg',
          title: 'PALI COMMEMORATION',
          shortDescription: 'For level-9 Pali graduates',
          link: 'activities.pali-commemoration'
        }
      ]
    }
  }

});
