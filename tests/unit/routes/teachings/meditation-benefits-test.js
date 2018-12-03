import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | teachings/meditation benefits', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teachings/meditation-benefits');
    assert.ok(route);
  });
});
