import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/meditation-retreat', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:events/meditation-retreat');
    assert.ok(route);
  });
});
