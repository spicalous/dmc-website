import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return {
      bhuddistCeremonies: [
        {
          cardImage: 'assets/images/activities/dhammachai-dhutanga/card.jpg',
          title: 'DHAMMACHAI DHUTANGA',
          shortDescription: 'Month-long mindfulness training',
          link: 'activities.dhammachai-dhutanga'
        },
        {
          cardImage: 'assets/images/activities/magha-puja/card.jpg',
          title: 'MAGHA PUJA',
          shortDescription: 'Inner light leads to a brighter world',
          link: 'activities.magha-puja'
        },
        {
          cardImage: 'assets/images/activities/earth-day/card.jpg',
          title: 'EARTH DAY',
          shortDescription: 'Protect your mind to protect the earth',
          link: 'activities.earth-day'
        },
        {
          cardImage: 'assets/images/activities/visakha-bucha/card.jpg',
          title: 'VISAKHA BUCHA',
          shortDescription: 'Buddha Day',
          link: 'activities.visakha-bucha'
        },
        {
          cardImage: 'assets/images/activities/kathina/card.jpg',
          title: 'KATHINA',
          shortDescription: 'Robe offering',
          link: 'activities.kathina'
        },
        {
          cardImage: 'assets/images/activities/alms-offering/card.jpg',
          title: 'ALMS OFFERING',
          shortDescription: '',
          link: 'activities.alms-offering'
        },
        {
          cardImage: 'assets/images/activities/pali-commemoration/card.jpg',
          title: 'PALI COMMEMORATION',
          shortDescription: 'For level-9 Pali graduates',
          link: 'activities.pali-commemoration'
        }
      ],
      trainingPrograms: [
        {
          cardImage: 'assets/images/activities/mass-ordination/card.jpg',
          title: 'MASS ORDINATION',
          shortDescription: 'Training heirs of Buddhism',
          link: 'activities.mass-ordination'
        },
        {
          cardImage: 'assets/images/activities/international-ordination/card.jpg',
          title: 'INTERNATIONAL ORDINATION',
          shortDescription: 'Your chance to try living a monk\'s life',
          link: 'activities.internation-ordination'
        },
        {
          cardImage: 'assets/images/activities/female-training-programs/card.jpg',
          title: 'FEMALE TRAINING PROGRAMS',
          link: 'activities.female-training-programs'
        },
        {
          cardImage: 'assets/images/activities/meditation-retreat/card.jpg',
          title: 'MEDITATION RETREAT',
          link: 'activities.meditation-retreat'
        }
      ]
    }
  }
});
