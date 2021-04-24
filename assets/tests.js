'use strict';

define("dmc-website/tests/helpers/destroy-app", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyApp;

  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define("dmc-website/tests/helpers/module-for-acceptance", ["exports", "qunit", "dmc-website/tests/helpers/start-app", "dmc-website/tests/helpers/destroy-app"], function (_exports, _qunit, _startApp, _destroyApp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _default(name, options = {}) {
    (0, _qunit.module)(name, {
      beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach() {
        let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(() => (0, _destroyApp.default)(this.application));
      }

    });
  }
});
define("dmc-website/tests/helpers/resolver", ["exports", "dmc-website/resolver", "dmc-website/config/environment"], function (_exports, _resolver, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };
  var _default = resolver;
  _exports.default = _default;
});
define("dmc-website/tests/helpers/start-app", ["exports", "dmc-website/app", "dmc-website/config/environment"], function (_exports, _app, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startApp;

  function startApp(attrs) {
    let attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(() => {
      let application = _app.default.create(attributes);

      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define("dmc-website/tests/integration/components/bs-carousel-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | bs carousel', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{bs-carousel}}
      */
      {
        "id": "05OmYFWt",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"bs-carousel\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('.carousel-control-prev').hasText('Previous');
      assert.dom('.carousel-control-next').hasText('Next');
    });
  });
});
define("dmc-website/tests/integration/components/bs-modal-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | bs modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#bs-modal}}
              template block text
            {{/bs-modal}}
          
      */
      {
        "id": "PURz453L",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"bs-modal\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('*').hasText('template block text');
    });
  });
});
define("dmc-website/tests/integration/components/hide-after-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | hide-after', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <HideAfter />
      */
      {
        "id": "F+KFJmqd",
        "block": "{\"symbols\":[],\"statements\":[[8,\"hide-after\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        "moduleName": "(unknown template module)"
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <HideAfter>
              template block text
            </HideAfter>
          
      */
      {
        "id": "G6lEC6uL",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[8,\"hide-after\",[],[[],[]],[[\"default\"],[{\"statements\":[[2,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        "moduleName": "(unknown template module)"
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("dmc-website/tests/integration/components/img-banner-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | img banner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{img-banner}}
      */
      {
        "id": "D5tfehpX",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"img-banner\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('*').hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#img-banner}}
              template block text
            {{/img-banner}}
          
      */
      {
        "id": "Cj4xjhCS",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"img-banner\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('*').hasText('template block text');
    });
  });
});
define("dmc-website/tests/integration/components/link-to-and-scroll-nav-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | link to and scroll nav', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{link-to-and-scroll-nav "any-route"}}
      */
      {
        "id": "WssamI4G",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],[\"any-route\"],null]]],\"hasEval\":false,\"upvars\":[\"link-to-and-scroll-nav\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('*').hasText('any-route'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#link-to-and-scroll-nav "any-route"}}
              template block text
            {{/link-to-and-scroll-nav}}
          
      */
      {
        "id": "V813FKWp",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],[\"any-route\"],null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"link-to-and-scroll-nav\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('*').hasText('template block text');
    });
  });
});
define("dmc-website/tests/integration/helpers/eq-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('helper:eq', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div>{{eq inputValue '1234'}}</div>
      */
      {
        "id": "bSyci/d6",
        "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[12],[1,[30,[36,1],[[35,0],\"1234\"],null]],[13]],\"hasEval\":false,\"upvars\":[\"inputValue\",\"eq\"]}",
        "moduleName": "(unknown template module)"
      }));
      assert.dom('div').hasText('true');
    });
  });
});
define("dmc-website/tests/test-helper", ["dmc-website/app", "dmc-website/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define("dmc-website/tests/unit/adapters/news-article-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | news article', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:news-article');
      assert.ok(adapter);
    });
  });
});
define("dmc-website/tests/unit/controllers/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define("dmc-website/tests/unit/controllers/media-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | media', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:media');
      assert.ok(controller);
    });
  });
});
define("dmc-website/tests/unit/controllers/news/article-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | news/article', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:news/article');
      assert.ok(controller);
    });
  });
});
define("dmc-website/tests/unit/controllers/news/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | news/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('reverses the model array', function (assert) {
      assert.expect(3);
      const initial = Ember.ArrayProxy.create({
        content: Ember.A([1, 2, 3])
      });
      const controller = this.owner.lookup('controller:news/index');
      controller.set('model', initial);
      const result = controller.get('recentToOldArticles');
      assert.strictEqual(result.get(0), 3);
      assert.strictEqual(result.get(1), 2);
      assert.strictEqual(result.get(2), 1);
    });
  });
});
define("dmc-website/tests/unit/models/news-article-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | news article', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('news-article')); // let store = this.store();

      assert.ok(!!model);
    });
  });
});
define("dmc-website/tests/unit/routes/activities-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | activities', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:activities');
      assert.ok(route);
    });
  });
});
define("dmc-website/tests/unit/routes/media-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | media', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:media');
      assert.ok(route);
    });
  });
});
define("dmc-website/tests/unit/routes/news-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | news', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:news');
      assert.ok(route);
    });
  });
});
define("dmc-website/tests/unit/routes/news/article-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | news/article', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:news/article');
      assert.ok(route);
    });
  });
});
define('dmc-website/config/environment', [], function() {
  var prefix = 'dmc-website';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('dmc-website/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
