import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return [
      {
        title: 'Temple Photos',
        imageSources: [
          'assets/images/media/temple-photos/1486544107716.jpg',
          'assets/images/media/temple-photos/1486544320624.jpg',
          'assets/images/media/temple-photos/1486544467452.jpg',
          'assets/images/media/temple-photos/1486544535766.jpg',
          'assets/images/media/temple-photos/1486544581094.jpg',
          'assets/images/media/temple-photos/1486544710262.jpg',
          'assets/images/media/temple-photos/1486544765295.jpg',
          'assets/images/media/temple-photos/1486544795774.jpg',
          'assets/images/media/temple-photos/1486920501795.jpg',
        ]
      },
      {
        title: 'Meditation Photos',
        imageSources: [
          'assets/images/media/meditation-photos/591012-meditation cl_236.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_623.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_1080.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_1803.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_1919.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_3136.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_3479.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_4269.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_5292.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_5625.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_5775.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_8325.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_8370.jpg',
          'assets/images/media/meditation-photos/591012-meditation cl_8659.jpg',
        ]
      },
    ];
  }
});
