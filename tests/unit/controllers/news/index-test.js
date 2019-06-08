import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

module('Unit | Controller | news/index', function(hooks) {
  setupTest(hooks);

  test('reverses the model array', function(assert) {
    assert.expect(3);

    const initial = ArrayProxy.create({ content: A([1, 2, 3]) });
    const controller = this.owner.lookup('controller:news/index');

    controller.set('model', initial);

    const result = controller.get('recentToOldArticles');
    assert.strictEqual(result.get(0), 3);
    assert.strictEqual(result.get(1), 2);
    assert.strictEqual(result.get(2), 1);
  });
});
