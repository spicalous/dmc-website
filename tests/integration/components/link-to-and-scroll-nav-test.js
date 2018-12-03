import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | link to and scroll nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{link-to-and-scroll-nav "any-route"}}`);

    assert.dom('*').hasText('any-route');

    // Template block usage:
    await render(hbs`
      {{#link-to-and-scroll-nav "any-route"}}
        template block text
      {{/link-to-and-scroll-nav}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
