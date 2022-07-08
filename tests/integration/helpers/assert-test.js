import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Ember from 'ember';

module('Integration | Helper | assert', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.emberOnError = Ember.onerror;
  });

  hooks.afterEach(function() {
    Ember.onerror = this.emberOnError;
  });

  test('it renders normally when the assertion is truthy', async function (assert) {
    assert.expect(1);

    Ember.onerror = () => {
      assert.ok(false, 'This should not run.');
    };

    await render(hbs`{{assert "Some assertion message" true}}`);

    assert.ok(true, 'Renders normally');
  });

  test('it fails to render when the assertion is falsy', async function (assert) {
    assert.expect(1);

    Ember.onerror = (error) => {
      assert.strictEqual(
        error.message,
        'Assertion Failed: Some assertion message'
      );
    };

    await render(hbs`{{assert "Some assertion message" false}}`);
  });
});
