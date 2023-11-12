'use strict';



;define("dmc-website/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("dmc-website/adapters/news-article", ["exports", "@ember-data/adapter/json-api", "dmc-website/config/environment"], function (_exports, _jsonApi, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class NewsArticleAdapter extends _jsonApi.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "namespace", 'assets/news');
    }

    urlForFindAll() {
      let baseUrl = this.buildURL();
      return this._addRootIfNotEmpty(`${baseUrl}/all.json`);
    }

    urlForQueryRecord({
      year,
      month,
      day,
      article
    }) {
      let baseUrl = this.buildURL();

      if (year.length < 5 && month.length < 3 && day.length < 3 && article.length < 3) {
        return this._addRootIfNotEmpty(`${baseUrl}/${year}/${month}/${day}/${article}.json`);
      }

      return this._addRootIfNotEmpty(baseUrl);
    }

    _addRootIfNotEmpty(url) {
      if (_environment.default.rootURL !== '/') {
        return `${_environment.default.rootURL}/${url}`;
      }

      return url;
    }

  }

  _exports.default = NewsArticleAdapter;
});
;define("dmc-website/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "dmc-website/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends _application.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("dmc-website/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("dmc-website/components/article-card", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ArticleCardComponent extends _component.default {
    get dateText() {
      const article = this.args.article;
      return `${article.day}/${article.month}/${article.year}`;
    }

  }

  _exports.default = ArticleCardComponent;
});
;define("dmc-website/components/bs-modal", ["exports", "jquery", "@glimmer/component", "@ember/object"], function (_exports, _jquery, _component, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  let BsModalComponent = (_class = class BsModalComponent extends _component.default {
    onDidInsert() {
      const modal = (0, _jquery.default)('.modal');
      modal.modal('show');
      modal.on('hidden.bs.modal', this.onDismissed.bind(this));
    }

    onWillDestroy() {
      (0, _jquery.default)('.modal').off('hidden.bs.modal');
    }

    onDismissed() {
      if (this.args.onDismissed) {
        this.args.onDismissed();
      }
    }

  }, (_applyDecoratedDescriptor(_class.prototype, "onDidInsert", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onDidInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onWillDestroy", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onWillDestroy"), _class.prototype)), _class);
  _exports.default = BsModalComponent;
});
;define("dmc-website/components/hide-after", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class HideAfterComponent extends _component.default {
    get hide() {
      const expiry = new Date(this.year, this.month, this.day);
      return Date.now() > expiry.getTime();
    }

  }

  _exports.default = HideAfterComponent;
});
;define("dmc-website/components/img-banner", ["exports", "@glimmer/component", "@ember/template"], function (_exports, _component, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ImgBannerComponent extends _component.default {
    get style() {
      let styles = [`background-image: url('${this.args.src}');`];
      const backgroundPosition = this.args.backgroundPosition;
      const contain = this.args.contain;
      const noRepeat = this.args.noRepeat;

      if (backgroundPosition) {
        styles.push(`background-position: ${backgroundPosition};`);
      }

      if (contain) {
        styles.push(`background-size: contain;`);
      }

      if (noRepeat) {
        styles.push(`background-repeat: no-repeat;`);
      }

      return (0, _template.htmlSafe)(styles.join(''));
    }

  }

  _exports.default = ImgBannerComponent;
});
;define("dmc-website/components/link-to-and-scroll-nav", ["exports", "@ember/routing/link-component"], function (_exports, _linkComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LinkToAndScrollComponent extends _linkComponent.default {
    _invoke() {
      super._invoke(...arguments);

      document.querySelector('nav').scrollIntoView();
    }

  }

  _exports.default = LinkToAndScrollComponent;
});
;define("dmc-website/controllers/application", ["exports", "jquery", "@ember/controller", "@ember/object", "@ember/service"], function (_exports, _jquery, _controller, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ApplicationController = (_class = class ApplicationController extends _controller.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "ui", _descriptor, this);
    }

    setUIModalContainerElement(element) {
      this.ui.modalContainerElement = element;
    }

    collapseNav() {
      (0, _jquery.default)('.navbar-collapse').collapse('hide');
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "ui", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "setUIModalContainerElement", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setUIModalContainerElement"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "collapseNav", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "collapseNav"), _class.prototype)), _class);
  _exports.default = ApplicationController;
});
;define("dmc-website/controllers/media", ["exports", "@ember/controller", "@ember/object", "@glimmer/tracking", "@ember/service"], function (_exports, _controller, _object, _tracking, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let MediaController = (_class = class MediaController extends _controller.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "ui", _descriptor, this);

      _initializerDefineProperty(this, "selectedAlbum", _descriptor2, this);

      _initializerDefineProperty(this, "selectedImage", _descriptor3, this);
    }

    selectAlbumAndImage(album, image) {
      this.selectedAlbum = album;
      this.selectedImage = image;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "ui", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedAlbum", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "selectedImage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "selectAlbumAndImage", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "selectAlbumAndImage"), _class.prototype)), _class);
  _exports.default = MediaController;
});
;define("dmc-website/controllers/news/article", ["exports", "@ember/controller", "@ember/template"], function (_exports, _controller, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class NewsArticleController extends _controller.default {
    get safeContent() {
      return (0, _template.htmlSafe)(this.model.content);
    }

  }

  _exports.default = NewsArticleController;
});
;define("dmc-website/controllers/news/index", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class NewsIndexController extends _controller.default {
    get recentToOldArticles() {
      return this.model.toArray().reverse();
    }

  }

  _exports.default = NewsIndexController;
});
;define("dmc-website/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("dmc-website/helpers/app-version", ["exports", "@ember/component/helper", "dmc-website/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = (0, _helper.helper)(appVersion);

  _exports.default = _default;
});
;define("dmc-website/helpers/ensure-safe-component", ["exports", "@embroider/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _util.EnsureSafeComponentHelper;
    }
  });
});
;define("dmc-website/helpers/eq", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.eq = eq;
  _exports.default = void 0;

  function eq(params
  /*, hash*/
  ) {
    return params[0] === params[1];
  }

  var _default = (0, _helper.helper)(eq);

  _exports.default = _default;
});
;define("dmc-website/helpers/loc", ["exports", "@ember/string/helpers/loc"], function (_exports, _loc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _loc.default;
    }
  });
  Object.defineProperty(_exports, "loc", {
    enumerable: true,
    get: function () {
      return _loc.loc;
    }
  });
});
;define("dmc-website/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pageTitle.default;
  _exports.default = _default;
});
;define("dmc-website/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("dmc-website/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("dmc-website/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "dmc-website/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("dmc-website/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("dmc-website/initializers/ember-cli-google-analytics", ["exports", "ember-cli-google-analytics/initializers/ember-cli-google-analytics"], function (_exports, _emberCliGoogleAnalytics) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberCliGoogleAnalytics.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _emberCliGoogleAnalytics.initialize;
    }
  });
});
;define("dmc-website/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("dmc-website/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("dmc-website/initializers/export-application-global", ["exports", "ember", "dmc-website/config/environment"], function (_exports, _ember, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("dmc-website/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("dmc-website/models/news-article", ["exports", "@ember-data/model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let NewsArticleModel = (_dec = (0, _model.attr)('string'), _dec2 = (0, _model.attr)('number'), _dec3 = (0, _model.attr)('number'), _dec4 = (0, _model.attr)('number'), _dec5 = (0, _model.attr)('string'), _dec6 = (0, _model.attr)('string'), (_class = class NewsArticleModel extends _model.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "title", _descriptor, this);

      _initializerDefineProperty(this, "year", _descriptor2, this);

      _initializerDefineProperty(this, "month", _descriptor3, this);

      _initializerDefineProperty(this, "day", _descriptor4, this);

      _initializerDefineProperty(this, "coverImage", _descriptor5, this);

      _initializerDefineProperty(this, "description", _descriptor6, this);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "year", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "month", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "day", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "coverImage", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "description", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = NewsArticleModel;
});
;define("dmc-website/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
});
;define("dmc-website/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
});
;define("dmc-website/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
});
;define("dmc-website/router", ["exports", "@ember/routing/router", "dmc-website/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends _router.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('about-us');
    this.route('teachings', function () {
      this.route('meditation-benefits');
      this.route('meditation-retreat');
    });
    this.route('activities', function () {
      this.route('dhammachai-dhutanga');
      this.route('magha-puja');
      this.route('earth-day');
      this.route('visakha-bucha');
      this.route('kathina');
      this.route('alms-offering');
      this.route('pali-commemoration');
      this.route('mass-ordination');
      this.route('internation-ordination');
      this.route('female-training-programs');
      this.route('meditation-retreat');
    });
    this.route('news', function () {
      this.route('article', {
        path: ':year/:month/:day/:article'
      });
    });
    this.route('media');
    this.route('contact');
    this.route('faqs');
    this.route('support');
  });
});
;define("dmc-website/routes/activities", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ActivitiesRoute extends _route.default {
    model() {
      return {
        bhuddistCeremonies: [{
          cardImage: 'assets/images/activities/dhammachai-dhutanga/card.jpg',
          title: 'DHAMMACHAI DHUTANGA',
          shortDescription: 'Month-long mindfulness training',
          link: 'activities.dhammachai-dhutanga'
        }, {
          cardImage: 'assets/images/activities/magha-puja/card.jpg',
          title: 'MAGHA PUJA',
          shortDescription: 'Inner light leads to a brighter world',
          link: 'activities.magha-puja'
        }, {
          cardImage: 'assets/images/activities/earth-day/card.jpg',
          title: 'EARTH DAY',
          shortDescription: 'Protect your mind to protect the earth',
          link: 'activities.earth-day'
        }, {
          cardImage: 'assets/images/activities/visakha-bucha/card.jpg',
          title: 'VISAKHA BUCHA',
          shortDescription: 'Buddha Day',
          link: 'activities.visakha-bucha'
        }, {
          cardImage: 'assets/images/activities/kathina/card.jpg',
          title: 'KATHINA',
          shortDescription: 'Robe offering',
          link: 'activities.kathina'
        }, {
          cardImage: 'assets/images/activities/alms-offering/card.jpg',
          title: 'ALMS OFFERING',
          shortDescription: '',
          link: 'activities.alms-offering'
        }, {
          cardImage: 'assets/images/activities/pali-commemoration/card.jpg',
          title: 'PALI COMMEMORATION',
          shortDescription: 'For level-9 Pali graduates',
          link: 'activities.pali-commemoration'
        }],
        trainingPrograms: [{
          cardImage: 'assets/images/activities/mass-ordination/card.jpg',
          title: 'MASS ORDINATION',
          shortDescription: 'Training heirs of Buddhism',
          link: 'activities.mass-ordination'
        }, {
          cardImage: 'assets/images/activities/international-ordination/card.jpg',
          title: 'INTERNATIONAL ORDINATION',
          shortDescription: 'Your chance to try living a monk\'s life',
          link: 'activities.internation-ordination'
        }, {
          cardImage: 'assets/images/activities/female-training-programs/card.jpg',
          title: 'FEMALE TRAINING PROGRAMS',
          link: 'activities.female-training-programs'
        }, {
          cardImage: 'assets/images/activities/meditation-retreat/card.jpg',
          title: 'MEDITATION RETREAT',
          link: 'activities.meditation-retreat'
        }]
      };
    }

  }

  _exports.default = ActivitiesRoute;
});
;define("dmc-website/routes/media", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class MediaRoute extends _route.default {
    model() {
      return [{
        title: 'Temple Photos',
        imageSources: ['assets/images/media/temple-photos/1486544107716.jpg', 'assets/images/media/temple-photos/1486544320624.jpg', 'assets/images/media/temple-photos/1486544467452.jpg', 'assets/images/media/temple-photos/1486544535766.jpg', 'assets/images/media/temple-photos/1486544581094.jpg', 'assets/images/media/temple-photos/1486544710262.jpg', 'assets/images/media/temple-photos/1486544765295.jpg', 'assets/images/media/temple-photos/1486544795774.jpg', 'assets/images/media/temple-photos/1486920501795.jpg']
      }, {
        title: 'Meditation Photos',
        imageSources: ['assets/images/media/meditation-photos/591012-meditation-cl_236.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_623.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_1080.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_1803.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_1919.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_3136.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_3479.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_4269.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_5292.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_5625.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_5775.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_8325.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_8370.jpg', 'assets/images/media/meditation-photos/591012-meditation-cl_8659.jpg']
      }, {
        title: 'Kathina 2018 Photos',
        imageSources: ['assets/images/media/kathina-2018-photos/001.jpg', 'assets/images/media/kathina-2018-photos/009.jpg', 'assets/images/media/kathina-2018-photos/010.jpg', 'assets/images/media/kathina-2018-photos/011.jpg', 'assets/images/media/kathina-2018-photos/012.jpg', 'assets/images/media/kathina-2018-photos/013.jpg', 'assets/images/media/kathina-2018-photos/014.jpg', 'assets/images/media/kathina-2018-photos/015.jpg', 'assets/images/media/kathina-2018-photos/016.jpg', 'assets/images/media/kathina-2018-photos/017.jpg', 'assets/images/media/kathina-2018-photos/018.jpg', 'assets/images/media/kathina-2018-photos/019.jpg', 'assets/images/media/kathina-2018-photos/020.jpg', 'assets/images/media/kathina-2018-photos/021.jpg', 'assets/images/media/kathina-2018-photos/022.jpg', 'assets/images/media/kathina-2018-photos/023.jpg', 'assets/images/media/kathina-2018-photos/024.jpg', 'assets/images/media/kathina-2018-photos/025.jpg', 'assets/images/media/kathina-2018-photos/026.jpg', 'assets/images/media/kathina-2018-photos/027.jpg', 'assets/images/media/kathina-2018-photos/028.jpg', 'assets/images/media/kathina-2018-photos/029.jpg', 'assets/images/media/kathina-2018-photos/030.jpg', 'assets/images/media/kathina-2018-photos/031.jpg', 'assets/images/media/kathina-2018-photos/032.jpg', 'assets/images/media/kathina-2018-photos/033.jpg', 'assets/images/media/kathina-2018-photos/034.jpg', 'assets/images/media/kathina-2018-photos/035.jpg', 'assets/images/media/kathina-2018-photos/036.jpg', 'assets/images/media/kathina-2018-photos/037.jpg', 'assets/images/media/kathina-2018-photos/038.jpg', 'assets/images/media/kathina-2018-photos/039.jpg', 'assets/images/media/kathina-2018-photos/040.jpg', 'assets/images/media/kathina-2018-photos/041.jpg', 'assets/images/media/kathina-2018-photos/042.jpg', 'assets/images/media/kathina-2018-photos/043.jpg', 'assets/images/media/kathina-2018-photos/044.jpg', 'assets/images/media/kathina-2018-photos/045.jpg', 'assets/images/media/kathina-2018-photos/046.jpg', 'assets/images/media/kathina-2018-photos/047.jpg', 'assets/images/media/kathina-2018-photos/048.jpg', 'assets/images/media/kathina-2018-photos/049.jpg', 'assets/images/media/kathina-2018-photos/050.jpg', 'assets/images/media/kathina-2018-photos/051.jpg', 'assets/images/media/kathina-2018-photos/052.jpg', 'assets/images/media/kathina-2018-photos/053.jpg', 'assets/images/media/kathina-2018-photos/054.jpg', 'assets/images/media/kathina-2018-photos/055.jpg', 'assets/images/media/kathina-2018-photos/056.jpg', 'assets/images/media/kathina-2018-photos/057.jpg', 'assets/images/media/kathina-2018-photos/058.jpg', 'assets/images/media/kathina-2018-photos/059.jpg', 'assets/images/media/kathina-2018-photos/060.jpg', 'assets/images/media/kathina-2018-photos/061.jpg', 'assets/images/media/kathina-2018-photos/062.jpg', 'assets/images/media/kathina-2018-photos/063.jpg', 'assets/images/media/kathina-2018-photos/064.jpg', 'assets/images/media/kathina-2018-photos/065.jpg', 'assets/images/media/kathina-2018-photos/066.jpg', 'assets/images/media/kathina-2018-photos/067.jpg', 'assets/images/media/kathina-2018-photos/068.jpg', 'assets/images/media/kathina-2018-photos/069.jpg', 'assets/images/media/kathina-2018-photos/070.jpg', 'assets/images/media/kathina-2018-photos/071.jpg']
      }];
    }

  }

  _exports.default = MediaRoute;
});
;define("dmc-website/routes/news", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class NewsRoute extends _route.default {
    model() {
      return this.store.findAll('news-article');
    }

  }

  _exports.default = NewsRoute;
});
;define("dmc-website/routes/news/article", ["exports", "jquery", "rsvp", "@ember/routing/route"], function (_exports, _jquery, _rsvp, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class NewsArticleRoute extends _route.default {
    model(params) {
      const {
        year,
        month,
        day,
        article
      } = params;
      return _rsvp.default.hash({
        data: this.store.queryRecord('news-article', params),
        content: _jquery.default.get(`assets/news/${year}/${month}/${day}/${article}.html`)
      });
    }

  }

  _exports.default = NewsArticleRoute;
});
;define("dmc-website/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("dmc-website/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("dmc-website/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("dmc-website/services/-ensure-registered", ["exports", "@embroider/util/services/ensure-registered"], function (_exports, _ensureRegistered) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ensureRegistered.default;
    }
  });
});
;define("dmc-website/services/page-title-list", ["exports", "ember-page-title/services/page-title-list"], function (_exports, _pageTitleList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitleList.default;
    }
  });
});
;define("dmc-website/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
});
;define("dmc-website/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("dmc-website/services/ui", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class UiService extends _service.default {}

  _exports.default = UiService;
});
;define("dmc-website/templates/about-us", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "Om69ht5N",
    "block": "[[[8,[39,0],null,[[\"@src\",\"@contain\"],[\"assets/images/about-us_cover.jpg\",true]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"ABOUT\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid p-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Vision: World Peace Through Inner Peace\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-justify\"],[12],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          Dhammakaya Foundation is a non-profit organisation, based on personal development, aiming to promote\\n          activities for the restoration of morality in individuals, families, societies, and the world.\\n        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          In many ways, peace is one of the most sought after commodities in the world, perhaps because true peace is so\\n          rarely found. Humanity seeks for peace in all places: books, music, exotic destinations, and companionship. We\\n          even spend great amounts of money in this pursuit. However, the greatest miracle of a human being is that\\n          PEACE is always within reach. In fact, it does not lie any further than where you are right now. The key to\\n          peace lies in its SIMPLICITY. To find peace, one only needs to close one’s eyes and become STILL.\\n        \"],[13],[1,\"\\n        \"],[10,\"blockquote\"],[14,0,\"blockquote text-center font-italic\"],[12],[1,\"\\n          \"],[10,2],[12],[1,\"\\n            When the mind of each person in this world knows true peace, the world will know peace. When the mind is\\n            peaceful, it will start to see the true cause of peace, and at the same time, the true cause of war. With\\n            this clarity, we can finally put an end to conflict, greed, and anger, and usher in an era of peace. Once we\\n            know peace for ourselves, it will be reflected in our thoughts, our speech, and in our actions. Love and\\n            good intention for mankind will arise and we will become the center of peace for people all around us; like\\n            the sun shining warm light to big and small stars, both near and far.\\n            \"],[10,\"footer\"],[14,0,\"blockquote-footer\"],[12],[10,\"cite\"],[14,\"title\",\"Luang Por Dhammajayo\"],[12],[1,\"Luang Por Dhammajayo\"],[13],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          Peace already exists – WITHIN US. It is always there in everyone, no matter who you are, where you live, or\\n          what you believe. We only need to be aware of it. Each human being has the potential to look within, to be\\n          still, and to experience peace. We can see for ourselves that the road which leads to world peace, lies within\\n          our INNER PEACE. Allow your journey to begin now...\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\"]]",
    "moduleName": "dmc-website/templates/about-us.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/alms-offering", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "KPxDjETT",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/alms-offering/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"ALMS OFFERING\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-lg-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"embed-responsive embed-responsive-16by9\"],[12],[1,\"\\n        \"],[10,\"iframe\"],[14,\"title\",\"alms offering video\"],[14,\"width\",\"560\"],[14,\"height\",\"315\"],[14,\"src\",\"https://www.youtube.com/embed/geUHRHQREYs\"],[14,\"frameborder\",\"0\"],[14,\"allow\",\"encrypted-media\"],[14,\"allowfullscreen\",\"\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-lg-6 mt-3\"],[12],[1,\"\\n      This project not only revives morality and the food-offering tradition, but it also serves to unite Buddhists\\n      and help our monks and novices in the four southern provinces who cannot go on their alms-round due to the civil\\n      unrest. Donated food and other goods are sent to help disaster victims as well. Initially the project intends to\\n      offer food for up to two million monks from 77 provinces in Thailand. However, the activity include the\\n      neighboring countries such as Myanmar and Laos as well.\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/alms-offering.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/dhammachai-dhutanga", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "fnNes5nV",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/dhammachai-dhutanga/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"DHAMMACHAI DHUTANGA\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        What is Dhutanga?\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Dhutanga is a monastic austerity practice to help remove defilements of the mind, one of which is attachment to\\n        things. Embarking on this pilgrimage, it is essential to travel light with the least amount of things.\\n        Therefore, Dhutanga monks will carry only the things they need: a tent held on a long-handled umbrella, a\\n        shoulder satchel, an alms-bowl and one set of monk’s robe.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Each day, they will have just one meal and will not take extra food after the first serving or accept additional\\n        food offered by the laity. Each evening they will reside at the location arranged by the staff and sleep in\\n        tents that they’ve been carrying. At each day’s destination, the Dhutanga monks will assemble to perform\\n        chanting and practice meditation together.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Throughout the day as they’re walking, the monks will observe the practice of silence and mindfulness and always\\n        carry a tranquil countenance and refined deportment of virtuous individuals who have trained themselves well.\\n        They will not be distracted by the heat or the hot surface under their feet, but will continue to walk\\n        gracefully and peacefully along to greet faithful supporters who have gathered to sprinkle marigold petals on\\n        the path and to enthusiastically welcome the Dhutanga monks walking pass their homes or offices.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The pilgrimage will bring joy to everyone participating and blessings to the land walked by these noble monks –\\n        like cool rain delivering happiness, delight and brightness.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Dhutaṅga is how monks take their disciplinary training to another level for the purpose of ridding themselves of\\n        defilements. Dhutaṅga is about living light so that monks have more time to focus on meditation and practicing\\n        mindfulness. Dhutanga monks eat only one meal per day, take up residence outdoors, and consume only food that\\n        they receive from alms rounds. They keep personal possessions to a bare minimum and typically journey barefoot.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        What is Dhammachai Dhutanga?\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The Dhammachai Dhutanga is one of the World Morality Revival Projects initiated by Phrathepyanmahamuni, Abbot of\\n        Dhammakaya Temple and President of the Dhammakaya Foundation. The inaugural pilgrimage was held in early 2011\\n        (2555 B.E.) and saw more than 1,000 monks journey on foot along the path in the pursuit of Perfections of the\\n        Great Master Phramongkolthepmuni (Sodh Candasaro), the re-discoverer of Dhammakaya meditation.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In 2016, the Dhammachai Dhutaṅga took place between the 2nd and 30th of January, covering seven provinces:\\n        Pathum Thani, Nonthaburi, Supanburi, Ayudhya, Nakon Pathom, Samutsakorn, and Bangkok. During a Dhutaṅga\\n        training, monks get to practice endurance, fortitude, compassion, giving, team spirit, concentration, awareness,\\n        and moment-to-moment meditation. As they journey barefoot, they meditate, share inner peace, and spread\\n        loving-kindness to all living beings.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The 1,131 monks on the Dhammachai Dhutaṅga pilgrimage come from different parts of Thailand. Yet, they are\\n        united by the mission to train themselves and to spread the message that “inner peace is a prerequisite to\\n        external peace in any society and the world at large”. Their peace journey also serves a tribute to honor the\\n        Buddha and the late Meditation Master Phramongkolthepmuni who rediscovered the Buddha’s key knowledge about the\\n        innate Body of Enlightenment (the Dhammakaya) which had been lost to the world about 500 years after His\\n        passing.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Although the annual Dhammachai Dhutaṅga pilgrimage is primarily for monks, many who had the opportunity to\\n        witness the group pilgrimage were inspired to learn and to practice the Buddha’s teachings. It is one thing to\\n        know Dhamma from written or spoken words; it’s another to live it. As the monks walk, they are putting their\\n        Dhamma practice to test. It is obviously easier to meditate or to keep one’s mind still in a cool and quiet\\n        environment, and we all should find time to do that. But the fact is most of us live in an ever-expanding urban\\n        society and face many challenges – some of which are outside our control. The only thing we ever have complete\\n        control over is our mind. Therefore, it is important for us to train our mind to be calm and cool no matter\\n        where we are. The Dhammachai Dhutaṅga monks is living proof that inner peace is possible anywhere, under any\\n        condition – cold rain or scorching sun – and it begins from within. They can do it, and so can you.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/dhammachai-dhutanga.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/earth-day", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "rtMUMkUx",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/earth-day/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"EARTH DAY\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        The Origin\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In 1970, the Honorable Gaylord Nelson, a United States Senator and passionate advocate for protecting the\\n        environment, helped establish April 22nd as Earth Day, the national day for the environment. His ambitious\\n        endeavor compelled the World Federation of Buddhist Youth (WFBY) to examine methods to keep the most important\\n        human resource – our mind – pristine and to safeguard it from thought, speech or action that will cause others\\n        distress and ultimately bind us to the endless cycle of suffering. Hence, WFBY petitioned for April 22nd to be\\n        known as “Dhamma Earth Day” under the motto, “Clean the World, Clean the Mind”.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Earth Day April 22\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        If one stirs water filled with dirt, the water turns brown; but if one leaves it still, it becomes clear, as\\n        dirt is isolated. The same can be said about the mind; for if it remains still, greed, anger, and desire, will\\n        be separated, and the mind itself will become pure.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        This special occasion reminds us to think more about our responsibilities as residents of the earth. It is a\\n        great opportunity for us to review all of our activities that may affect the conditions of the earth. In other\\n        words, any actions that we can do to improve the current conditions of the earth and the environment.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The conditions of the planet earth are changing daily due to two main factors: Natural phenomena and human\\n        activities.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Natural phenomena such as flood, wild fire, and storms, are part of nature itself. They are the factors that\\n        help shape the earth. The earth we live in today is a work of nature. These events that affect earth conditions\\n        are difficult to control and may not be desirable to control.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Human activities such as deforestation, nuclear testing, air and water pollution, and over consumption of\\n        natural\\n        resources, on the other hand, are the factors that deteriorate the earths condition and may be controlled. Since\\n        human beings are the main cause of environmental problems, it is necessary to change people’s attitudes and\\n        behaviors towards the earth.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Human beings consist of two main parts: the body and the mind.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The mind controls the body to act as the mind wishes. As the Buddha says, “The mind controls everything.\\n        Everything can be achieved by the power of the mind. A person with an evil mind can do any kind of evil thing. A\\n        person with a purified mind can do endless good deeds that benefit the society.”\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Therefore, the best way to change human actions is to change the way people think. That is, to train the mind\\n        to be able to see things the way as they actually are. People with clear and purified minds can act more\\n        reasonably than those with confused minds. Although it may take some time to train people’s minds, the results\\n        will be invaluable.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Two Virtues that Protect the World\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        According to Buddhism, the attitudes that help keep the world in order are\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Hiri (disgust/shame about bad things) When we are disgusted by something, we will avoid being near to or\\n          doing that thing. By developing this kind of feeling towards bad behavior, we will not do that type of action.\\n          For example, if we have an aversion towards stealing, we will never steal from anybody, even though no one\\n          would know we had done it.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Ottappa (fear of the result of committing bad actions) When we are afraid of the consequence of something,\\n          we will not initiate any kind of action to cause it to happen. Committing bad actions may result in the\\n          suffering of others or our own selves.\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        People who possess the qualities of Hiri and Ottappa will not hurt or cause any disturbance to others. They will\\n        not destroy the environment or deteriorate the conditions of the earth since they hate such actions and are\\n        afraid of bad consequences.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        How to develop Hiri and Ottappa\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In order to develop a high level of Hiri and Ottappa, we have to have a strong determination, which can be\\n        achieved through the practice of meditation. Meditation is the best way to train our mind to be strong, firm,\\n        and calm at the same time. It helps the mind to calm down, be able to focus on the important issues and see\\n        things the way as they actually are. Especially when one attains Dhammakaya through meditation, one will feel\\n        spiritually happy and want others and the world to be at peace. People with a confused and agitated state of\\n        mind may have wrong perceptions of the things they see.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Recognizing the importance of meditation in helping people to develop a better cognition of the things\\n        surrounding us, the Dhammakaya Foundation has proposed to the World Fellowship of Buddhist Youth that meditation\\n        practice should be included as one of the activities to commemorate Earth day.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The slogan “Clean the world. Clean the mind” was also proposed. The committees of the association agreed with\\n        the proposal and support such activity. In order to propagate the practice of meditation as a way to develop\\n        people’s mind, the Dhammakaya Foundation, under the initiation of Phrarajabhavanavisudh, has been constructing\\n        the Dhammakaya Cetiya to be a meditation and gathering center at Wat Phra Dhammakaya since 1994.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The Cetiya will be a place for people to meditate in order to purify their minds so that the feeling of Hiri and\\n        Otappa reside within them. Having purified minds, people can think clearly before doing things. As a result, it\\n        helps reduce the number of people whose activities deteriorate the conditions of the earth\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Earth Day is an annual event organized at Wat Phra Dhammakaya as affirmation that true peace and harmony in the\\n        world begins with inner peace. The activities throughout the day are based on the Buddha’s Teachings on\\n        purifying one’s mind through generosity (Dana), moral discipline (Sila) and the practice of meditation\\n        (Bhavana). The morning session begins at 9.30 am with a meditation session, followed by the offering of midday\\n        meal as Sanghadana to the monastic community and the presentation of grants to the teachers in the four southern\\n        provinces of Thailand as a show of support for their unwavering commitment.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In the afternoon, there is a meditation session and chanting of the Dhammacakkappavattana Sutta by the venerable\\n        monks. The principle Dhamma of the chanting pertains to the elimination of suffering through the practice of the\\n        Middle Way. This will be followed by the offerings ceremony to the monastic community comprises 30,000 temples\\n        throughout Thailand, including monks from 300 temples in the four southern provinces. The evening culminates\\n        with a circumambulation of the Great Dhammakaya Cetiya as demonstration of our utmost respect and homage to the\\n        Lord Buddha.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/earth-day.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/female-training-programs", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "F3M4MPGy",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/female-training-programs/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"UPASIKA KAEW\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Upasika Kaew: the new generation\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In Budddhism, a lady who takes refuge in the triple gem and supports the Buddhist activities is called an\\n        Upasika. Since the Lord Buddha’s time, Upasikas have played an important role in patronising the temples and the\\n        monks and are considered a part of the four main groups of Buddhists: Bhikku, Bhikkuni, Upasok, and Upasika. An\\n        example Upasika worth mentioning is Maha Rattana Upasika Visakha, who built Bubbharam, an important Buddhist\\n        temple.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Upasika Kaew is a morality training program for ladies to explore the eight precepts and follow the Middle Way,\\n        which is a path of enlightenment and purity. The ladies who take part in this program will learn about\\n        disciplines and learn to keep their body and their mind pure and bright. This training program will improve the\\n        morality level in Buddhism as a whole.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Therefore, the Religion, Art and Culture Commissioners of the House of Representatives, Wat Phra Dhammakaya, the\\n        Dhammakaya Foundation, the Village Leader Association of Thailand and the International Buddhist Society as well\\n        as the other patrons organized this 100,000 mass Upasika Kaew training program from 8-15 March, 2553 B.E. at\\n        training temples every province across Thailand. The aim is not only to improve ethical conduct of Thai ladies\\n        to be good citizens of the society they belong, but also to help revive the morality of the world.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        During the program, women practiced renunciation, performed wholesome deeds, and learned about the Buddhist\\n        Ideal and morality. The women who undertook the training can play an important role in protecting Buddhism and\\n        reviving world morality.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Meditation centres across the world organise Upasika Kaew training programs annually. Please contact your local\\n        meditation centre for more information\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/female-training-programs/female-training-programs-1.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/female-training-programs/female-training-programs-2.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/female-training-programs/female-training-programs-3.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/female-training-programs/female-training-programs-4.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Objectives\\n      \"],[13],[1,\"\\n      \"],[10,\"ul\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"To educate morality and ethics through Buddhist teaching and thus make Buddhist ladies understand how to\\n          become true Upasika\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"To revive morality as well as Buddhist tradition to be as propereous as in the Lord Buddha’s time\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"To develop sustainable peaceful community and country by simply improving their ethical conducts\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/female-training-programs.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "Ig4/YPEJ",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities_cover.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"ACTIVITIES\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Buddhist Tradition: World Peace through Inner Peace\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Throughout its history, the Dhammakaya Temple has never wavered from its mission to create world peace through\\n        inner peace by promoting the Buddha’s method of meditation and teachings. The ultimate aim of all activities\\n        organized by the temple is to bring peace to the minds of individuals, to society, and to the world that we all\\n        share.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The goal was to make the temple a meditation-learning center for monks, novices, and peace-loving people of all\\n        ages, nationalities and races. Back then, the questions were: \"],[10,\"i\"],[12],[1,\"‘why is it that the majority of people who come\\n        to the temple – any temple – are old people when the Buddha’s teachings are applicable for people of every age\\n        and are best learned when they are young?’\"],[13],[1,\", \"],[10,\"i\"],[12],[1,\"‘Have people lost interest in temples or have temples ceased\\n        to be interesting?’\"],[13],[1,\" and \"],[10,\"i\"],[12],[1,\"‘How can we encourage and inspire people to learn Dhamma?’\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        During its first 30 years, we concentrated on building a strong foundation of activities and different projects\\n        within the temple. Later, the scope of these activities expanded to cooperate with many other Buddhist\\n        organizations, non-governmental organizations, and educational institutions. Below are the examples of such\\n        activities.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Buddhist Ceremonies\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"model\",\"bhuddistCeremonies\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-12 col-sm-6 col-md-4 col-lg-3 py-5\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"card-img-top\"],[15,\"src\",[30,1,[\"cardImage\"]]],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h4\"],[14,0,\"card-title\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n            \"],[10,2],[14,0,\"card-text\"],[12],[1,\"\\n              \"],[1,[30,1,[\"shortDescription\"]]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[8,[39,3],[[24,0,\"card-link\"]],[[\"@route\"],[[30,1,[\"link\"]]]],[[\"default\"],[[[[1,\"\\n              Read more\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"\\n        Meditation and Mindfulness Training Programs\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"model\",\"trainingPrograms\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-12 col-sm-6 col-md-4 col-lg-3 py-5\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"card-img-top\"],[15,\"src\",[30,2,[\"cardImage\"]]],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h4\"],[14,0,\"card-title\"],[12],[1,[30,2,[\"title\"]]],[13],[1,\"\\n            \"],[10,2],[14,0,\"card-text\"],[12],[1,\"\\n              \"],[1,[30,2,[\"shortDescription\"]]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[8,[39,3],[[24,0,\"card-link\"]],[[\"@route\"],[[30,2,[\"link\"]]]],[[\"default\"],[[[[1,\"\\n              Read more\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[2]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"ceremony\",\"program\"],false,[\"img-banner\",\"each\",\"-track-array\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/internation-ordination", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ZZmaVvKP",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/international-ordination/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"INTERNATIONAL ORDINATION\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col lead\"],[12],[1,\"\\n      Thailand is a Buddhist Society. A major part of Thai culture steams from Buddhist heritage. From our ancestor’s\\n      generation, a large legacy of humble thought and traditions designed to instill sound moral values. This legacy is\\n      an inheritance from our past that will guide us into the future. The ritual ordination is a process whereby the\\n      individual raises his level of consciousness and transcends from being a follower of Triple Gem to become a part\\n      of the Triple Gem. Those who choose a path of ordination, therefore, will have to follow the precepts of purity\\n      and monastic regulations. By ordination, the individual chooses to take the first initial steps on the path toward\\n      living life righteously. Since, the ordained life will free individuals from daily burdens of the mundane. The\\n      ordained daily life is dwelled economically by life’s necessities such as foods and clothes. With this ordinary\\n      and simple livelihood, the ordained ones will have more time to gain knowledge, wisdom and a greater understanding\\n      of the world, both socially and mentally.\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        The importance of the ordination\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Those who are ordained are not merely individuals who shave their heads and wear monk’s robes; they must train,\\n        practise and embody the teaching of the lord Buddha. This is a path to purification. The 227 precepts which are\\n        the rules, regulations and traditions will guide the ordained ones to differentiate themselves from the mundane.\\n        They help to strengthen the individual’s determination in facing life’s challenges by instilling mindfulness,\\n        patience and purpose in life. These precepts are the guarantees for the future, whether the individual\\n        subsequently chooses the path way of lay world or that of the ordained monk. The knowledge learnt during\\n        ordination will not be wasted or served to harm others. The strict study of Dhamma, in both theory and practice,\\n        lifts the individual’s consciousness to a higher level, so he may know the truth and goodness, to attain\\n        spiritual goals and the true meaning of life.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-0.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-1.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-2.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-3 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-3.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        The happiness of life\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The Lord Buddha blessed us with his knowledge to verify what is the true happiness in life. He defined happiness\\n        in this world onto two categories.\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Samisa Sukha; the happiness that depends on the material possessions such as humans (boyfriends, girlfriends,\\n          sons or daughters and beloved ones), animals and objects. This type of happiness is impermanent and will\\n          eventually bring suffering into life. The sufferings are in form of attachment, worry, jealousy, pride, pain,\\n          disappointment, etc.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Niramisa Sukha; the happiness achieved through the Dhamma by means of insight meditation. This is the only\\n          form of true happiness. Ones will free from attachment and that point to the path of eternal happiness,\\n          Nirvana.\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Without the teaching of the Lord Buddha, the search for the true happiness would be a difficult endeavor\\n        indeed. Even the Lord Buddha himself spent six arduous years to discover the niramisa sukha, the true happiness.\\n        Finally, he concluded that one who lives worldly mundane walks on a narrow and uncomfortable path, containing of\\n        daily sufferings, clouded from the truth. By embracing Dhamma and Vinaya, true happiness and disciplines, one is\\n        bathed in the light of truth and happiness. So, one must shave head, don saffron robes and ordain into a life\\n        free from worldly possessions.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Qualifications for those to be ordained\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The lord Buddha gave permission to males who take the Triple Gem as a refuge to ordain. For those who wish to\\n        ordain as a Buddhist monk must be at least 20 years of age. Those who are under will be allowed to ordain as a\\n        novice. The persons forbidden from being a monk are:\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Those that are homosexuals or hermaphrodites.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Those who have done wrong against Buddhism such as killed an Arahant, caused schism in monastic community and\\n          asked to leave monkhood before.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Those who suffer from the following diseases;\\n          \"],[10,\"ul\"],[12],[1,\"\\n            \"],[10,\"li\"],[12],[1,\"\\n              Leprosy, Measles or Pox, fungus of skin.\\n            \"],[13],[1,\"\\n            \"],[10,\"li\"],[12],[1,\"\\n              Skeletal deformity including handicapped, blind or deft.\\n            \"],[13],[1,\"\\n            \"],[10,\"li\"],[12],[1,\"\\n              Debilitating weakness.\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Those who have prior restrictions or commitments such as not having parental or guardian consent, or by\\n          reasons of royal decree\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Duties and Responsibilities for Monks\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The main purpose of ordination is to free one’s life from worldly commitments and worries. So, they will have\\n        the opportunity to commit themselves to meditation and break away from the shackles of desire until they can\\n        find the true happiness and path to Nirvana. To be free from worldly desire, the monk must fulfill all required\\n        and recommended duties based on tenets clearly specified by the Lord Buddha.\\n        The Lord Buddha required monks to follow the Kiccavatta (Duties) which are clearly described in the Scriptures.\\n        The kiccavatta(s) are described as a MUST and SHOULD of daily or regularly performing activities. If those who\\n        ordain as Buddhist monk perform these duties regularly, they will increase inner morality and their mind will be\\n        strengthened. The duties will help them to be free from worldly desire. The duties and responsibilities have\\n        been concluded as followings;\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Almsround\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Temple Cleaning\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Confession\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Chanting and Meditation\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Reflection\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Caring for the Preceptor\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Exercise and Self Maintenance\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Dhamma and Monastic Studies\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Caring for Temple Properties\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Behavior Worthy of Respect\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-4 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-4.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-4 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-5.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-12 col-md-4 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/international-ordination/international-ordination-6.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      Wat Phra Dhammakaya was established to carry on the legacy handed down from our ancestors. Its mission is to\\n      have the temple to be a place that is suitable for providing an appropriate training of ordination program. The\\n      ordained ones will be taught how to accomplish true happiness and how to become a respectful monk. Even though\\n      some of them choose to be in the path of the worldly life; they can use the knowledge obtained during ordination\\n      for daily life’s benefit. This year is an opportunity, not only in the Dhammakaya center of Thailand but also for\\n      international centers like Newcastle, Manchester or London. Please contact your nearest Dhamakaya Meditation\\n      center and be ready to become a person of ceremony. Rejoice in your merit.\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/internation-ordination.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/kathina", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "WXpWMU8m",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/kathina/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"KATHINA\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col lead\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Kathina-Robe Offering is a wonderful Buddhist tradition that has been preserved for thousands of years since the\\n        Buddha’s time. It is a practice established by the Buddha permitting the lay community to make a respectful\\n        offering of robes to monks who have spent three months during Buddhist Lent purifying their mind and body. The\\n        objective as envisioned by the Buddha was to foster harmony in the monastic community and to allow virtuous\\n        monks with torn robes to receive new sets. The fruit from this good deed is tremendous—as the Lord Buddha\\n        expounded in one of His teachings that sanghadāna, the offering of DĀNA, yields positive consequences for the\\n        donor.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In other words, those who wish to acquire a great source of merit should perform wholesome deeds with the\\n        monastic community.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Why Kathina?\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The Vinaya, or the monastic code of discipline, states that Buddhist temples can organize a Kathina Ceremony\\n        only once a year. Additionally, it specifies that the organization of Kathina is restricted to a time period of\\n        one month after the final day of Buddhist Lent, from the 1st day of the 11thwaning moon to the 15th day of the\\n        12th waxing moon. Each temple can select a day within this period to organize their respective Kathina Ceremony.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        When does this ceremony happen?\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Every year on the first Sunday of November, the Kathina-Robe Offering Ceremony is organized at the Dhammakaya\\n        Temple, where over thousands of venerable monks and novice monks who have earnestly observed the Buddhist Lent\\n        for the past three months will act as the fertile fields of merit for thousands of loyal supporters in Thailand\\n        and abroad in attendance. Therefore, we cordially invite everyone to come join us in the Kathina-Robe Offering.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/kathina.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/magha-puja", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "Y7ktc8fn",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/magha-puja/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"MAGHA PUJA\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        What is Magha Puja?\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Magha Puja is an important religious festival celebrated by Buddhists on the full moon day of the third lunar\\n        Month for more than 2500 years. It marks the four auspicious occasions which happened nine months after the\\n        Enlightenment of the Buddha near Rājagaha in Northern India.\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"It was the full-moon day of the third lunar month.\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          There were 1,250 Arahants, the enlightened disciple monks, who came to see the Lord Buddha that evening\\n          without any prior arrangement.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"All of them were ordained by the Buddha himself.\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          The Buddha delivered a sermon called the “Ovada Patimokkha” which includes the fundamental ideology, the\\n          moral standards and the conducts of Buddhism.\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The Buddhist ideology is the ultimate objective of every Buddhist. As outlined in the Lord Buddha’s sermon,\\n        Buddhist ideology comprises the following:\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          We should be patient in order to reach our achievement. As our life may be burdened by suffering, we should be\\n          patient. Furthermore, patience toward sensual desire can prevent us from sensual indulgence.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"All the Lord Buddhas have taught that Nirvana is the state of supreme bliss.\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Monks who kill or harm other living beings do not deserve to be monks.\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Subsequently the Lord Buddha suggested the following moral standards:\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Abstaining from misdeeds because the Law of Karma still controls us. If we break precepts or commit bad deeds,\\n          karmic retribution will return to us either in this lifetime or during a future lifetime.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Doing only good deeds. When the karma from good deeds bears fruit, our life will be joyful, prosperous and\\n          successful.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Purifying our mind by practicing meditation. This is the only way that we are able to attain true happiness\\n          and Nirvana.\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Finally, he recommended the conducts which his disciples should obey.\\n      \"],[13],[1,\"\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          The propagation of Buddhism should be made without insulting or making slanderous allegations against each\\n          other.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          The propagation of Buddhism should be made without assaulting or harming each other.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Buddhists should observe the precepts. In particular, Buddhist monks must observe all 227 precepts.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          One should be content in consuming food.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          One should live in a tranquil place which is suitable for meditation practice.\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          One should always practice mindfulness even when standing, walking, sitting, or sleeping.\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Lighting Lanterns to Cultivate Faith and Wisdom\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The light of faith and wisdom that we light up in homage to the Triple Gem represents our faithful heart with\\n        realization in the Lord Buddha’s virtues. We humbly offer the light to worship his compassion, purity and wisdom\\n        as he knew the truth of life thoroughly. Nothing could conceal his insight power. As we worship him with\\n        respect, we will receive merit in return. The merit from paying homage to the wholesome one will enable us to be\\n        prosperous and successful in our lives. The gift of light will allow us to have beautiful eyes, superb vision,\\n        beautiful radiance, a bright mind, luminous wisdom and, ultimately, attain the Buddhahood or Dhammakaya inside\\n        ourselves.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        According to the Buddhist scripture, there was once a lady who faithfully lit lanterns to pay homage to the Lord\\n        Buddha. Later on, her good karma caused her to be reborn as a beautiful lady with a golden subtle complexion.\\n        Radiance glowed from her body constantly. Even when she was in the dark, she was able to see things because of\\n        her own radiance. After she ordained to become a Bhikkhuni (female Buddhist monk), she managed to attain\\n        enlightenment quickly and went on to become a female disciple monk who was recognized by the Lord Buddha as the\\n        one who was excellent in recalling past lifetimes. From this story, we can conclude that the act of worship to\\n        the Triple Gem is indeed the opportunity to develop our own mind by realizing and welcoming the wholesomeness of\\n        the Triple Gem into our own heart, similar to opening the lid of a crystal jar to receive drops of clean rain\\n        from the sky. We do not only believe in what we do, but we also understand why we do it. This is why the act of\\n        worship allows us to cultivate both faith and wisdom simultaneously.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        You are cordially invited to join the Magha Puja Day ceremony at the Dhammakaya Meditation Centre of Newcastle!\\n        Magha Puja Day is one of the most important Buddhist holy days in Thailand. Every temple across country holds a\\n        ceremony to celebrate the occasion. The ceremony at Wat Phra Dhammakaya is one of the largest held in Thailand\\n        which main Light For Peace.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/magha-puja.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/mass-ordination", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "zSKk55zf",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/mass-ordination/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"MASS ORDINATION\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        The Purpose\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In order to maintain Buddhism in Thailand, Buddhist monks have to collaborate to spread Lord Buddha’s teachings.\\n        However, according to an official record of the National Office of Buddhism, dated 1 June 2009, there are 5,937\\n        deserted temples in Thailand. Mainly because fewer people are entering monkhood. When people spend less than a\\n        month in monkhood, they do not have sufficient time to train themselves and to study Dhamma profoundly. As a\\n        result, very few people are aware of the true value of ordination. More over, these days very few employers\\n        allow their employees to take a three-month leave of absence to be ordained as monks during the Rains Retreat\\n        period. Hence, there are very few ordainees to propagate Buddhist teachings, resulting in the critical situation\\n        of Buddhism in Thailand.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        How does mass ordination happen?\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Therefore, in order to produce the new generation of Buddhist monks to become the troop of Buddhism, Wat Phra\\n        Dhammakaya held a mass ordination of 7,000 monks from 7,000 villages throughout Thailand in year 2552 B.E. (2009\\n        A.D.) and over 10,000 people were interested in participation. In consequence, Wat Phra Dhammakaya continued to\\n        arrange appropriate trainings for the rest of people interested.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        And in year 2553 B.E. (2010 A.D.), the mass ordination of 100,000 monks from 70,000 villages started twice a\\n        year—one in summer and the other one during the rains-retreat. Every year, there are a lot of people interested\\n        to participate in the program and even extend their stay in monkhood and are assigned to different temples in\\n        their hometowns, resulting in the decreasing numbers of deserted temples.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        In the most recent record of the National Office of Buddhism, in November 2557 B.E. (2014 A.D.), the numbers of\\n        deserted temples had been decreased down to only 4,000 temples.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"embed-responsive embed-responsive-16by9\"],[12],[1,\"\\n        \"],[10,\"iframe\"],[14,\"title\",\"mass ordination video\"],[14,\"width\",\"560\"],[14,\"height\",\"315\"],[14,\"src\",\"https://www.youtube.com/embed/pTY860kh3U0\"],[14,\"frameborder\",\"0\"],[14,\"allow\",\"encrypted-media\"],[14,\"allowfullscreen\",\"\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/mass-ordination/image-1.jpg\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/mass-ordination.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/meditation-retreat", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "wrtZLyJT",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/meditation-retreat/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"MEDITATION RETREAT\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"lead\"],[12],[1,\"Make the time to step out of your daily routine. Give yourself a unique occasion to reflect and be restored by the beauty and tranquility of nature. This is your chance to truly relax and search for the real meaning of your life.\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"What do you learn?\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Dhammakaya Meditation Centres organize meditation retreats for people who are new to the practice or those who\\n        would like to hide away from hectic lifestyle to cultivate their own inner peace. The retreat program was put\\n        together for people who love inner peace, to provide the opportunity to practice the fundamentals of meditation,\\n        and to provide a chance to learn Dhamma that is universal for all to benefit our daily lives.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Participants will learn how to meditate in a peaceful environment with a Buddhist monk. Meditation will be\\n        taught using The Middle Way technique, also known as the Dhammakaya technique in Thailand. This technique\\n        emphasises on comfort. Within a comfortable environment, can people's minds become truly calm and peaceful.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Throughout the meditation retreat, there will be sessions of teaching and meditation practice. Participants can\\n        also personally request coaching to guide and tune the mind effectively. Participants are encouraged to ask\\n        questions concerning meditation, how to apply teachings into everyday life, and Buddhism to teaching monks.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Participants will also learn valuable Buddhist culture and disciplines such as paying respect to monks, wiping\\n        and cleaning dishes thoroughly, and placing shoes in an orderly row. Everyone could adapt such knowledge into\\n        their daily lives in their own countries.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Moreover, this program offers a variety of special activities including yoga, soap bubble blowing, offering\\n        food to the monks, and sharing meditation obstacles and experiences. The teaching monk will kindly give advice\\n        and solutions to obstacles and provide techniques to allow participants to progress in their meditation.\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mt-5\"],[12],[1,\"Overview\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Everyone is welcome to join the retreat, regardless of your ethnicity, or religious background. The minimum age\\n        requirement is 18, however there may be youth camps available for younger students. We request that all\\n        participants be in a good state of health and comfortable in rustic surroundings with a genuine desire to lean\\n        and practice meditation. All participants are requested to take two meals a day to support your meditation\\n        practice and abstain from smoking and drinking alcohol.\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mt-5\"],[12],[1,\"Fee?\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Fees are kept to a minimum and will be used just for the cost of the retreat. Fees cover all meals and\\n        accommodation. If you are not able to cover the fee, please contact us and we can offer a lower supported fee.\\n        For those that would like to be a benefactor, we provide a sponsor fee which allows you to help others come to\\n        the retreat who cannot afford the fee.\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mt-5\"],[12],[1,\"What do I need to bring?\"],[13],[1,\"\\n      \"],[10,\"ul\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Personal items, bathing equipment and towels\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Personal meditation\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Warm clothing\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Loose, simple, and comfortable clothing (preferably in white or light colours). Transparent or revealing\\n          clothes should not be worn in the retreat. This includes sleeveless shirts and shorts\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Individual bottle / flash for water\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[14,0,\"my-5\"],[12],[1,\"\\n        Meditation centres across the world organise meditation retreat programs annually. Please\\n        \"],[8,[39,1],null,[[\"@route\"],[\"contact\"]],[[\"default\"],[[[[1,\"contact us\"]],[]]]]],[1,\"\\n        or your local meditation centre\\n        for more information\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-4 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/meditation-retreat/meditation-retreat-1.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-4 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/meditation-retreat/meditation-retreat-2.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-4 mt-2\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,0,\"img-fluid\"],[14,\"src\",\"assets/images/activities/meditation-retreat/meditation-retreat-3.jpg\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/meditation-retreat.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/pali-commemoration", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "RX/bs37v",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/pali-commemoration/banner.png\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"PALI COMMEMORATION\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Phrathepyanmahamuni and the Dhammakaya Foundation have been awarding scholarships to the Pali Schools nationwide\\n        for 19 consecutive years since 1988. We hold the celebration ceremony for the “World-Class” Level 9 (highest)\\n        Pali Graduates annually during World Meditation Day.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        The Dhamma teachings of the Lord Buddha have been restored and maintained in the Pali language. We hope, with\\n        our continuous efforts to promote Pali Studies, the Dhamma will be pure and not be distorted over thousands and\\n        thousands of years to come. In addition to the restoration, we can spread Dhamma far and wide to benefit all\\n        Buddhists and all mankind.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/pali-commemoration.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/activities/visakha-bucha", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "5N4Tuhqx",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/activities/visakha-bucha/banner.jpg\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"VISAKHA BUCHA\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col lead\"],[12],[1,\"\\n      Visakha Puja Day is one of the most important days in Buddhism and for Buddhists. It is the day Buddhists assemble\\n      to commemorate the life of the Buddha, and to give reverence to His purity, profound wisdom and immense compassion\\n      for all humankind and living beings by reflecting and using His teachings as guidelines for their lives.\\n      Visakha Puja Day also marks the anniversary of three significant events in the life of the Buddha – His Birth,\\n      Enlightenment, and Attainment of Complete Nirvana – that occurred on the 15th day of the 6th waxing moon.\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        His Birth\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        When Queen Sirimahamaya, King Suddhodana’s Royal Consort, was due to give birth, she returned to her home in\\n        Devadaha City for the childbirth as it was a royal tradition. Along the journey, she stopped to rest under the\\n        sala trees in Lumbini Park. As she was standing and holding on to a tree branch, she gave birth to a prince. The\\n        birth occurred on a full moon day of the sixth lunar month eighty years before the beginning of the Buddhist\\n        Era. When the prince was five days old, he was bestowed the name Siddhattha – meaning ‘fulfillment’.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        News of Prince Siddhattha’s birth spread quickly, eventually reaching Hermit Asitha, an acquaintance of King\\n        Suddhodana residing in the Himalayas. Hermit Asitha requested a visitation to see the newborn prince. When he\\n        saw the prince, he predicted that the prince would be self-enlightened and discover the path to Nibbana, and\\n        eventually become the Buddha. The prince would teach the people the way to end suffering and spread love and\\n        kindness to all humankind. After presenting his prediction, Hermit Asitha bowed respectfully at the prince’s\\n        feet. Witnessing the act, King Suddhodana was overjoyed and bowed to the prince as well. Later, the King invited\\n        eight Brahmin scholars specializing in astrology to examine and predict Prince Siddhattha’s destiny. Seven of\\n        them predicted that the prince will become a Supreme Emperor if he assumes the throne; however, if he decides to\\n        ordain, he will become the Buddha. However, Konddanya, the youngest of the Brahmins, prophesied that the prince\\n        will choose the latter path and become the Buddha.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        His Enlightenment\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        King Suddhodana wished for Prince Siddhattha to continue the reign of the kingdom and to eventually become the\\n        Supreme Emperor. He provided every luxury his son could ever want in the three palaces (for seasonal occupation)\\n        that were filled with beautiful royal consorts in an effort to shield the prince from witnessing any forms of\\n        suffering and sadness that would lead to apathy and a desire to ordain. The opulent life of the prince was\\n        filled with beauty, wealth, royal attendants, prestige, fame, and bliss.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        One day, when Prince Siddhattha was 29 years old, he rode his horse outside the palace and encountered an aging\\n        person, a sick person, a corpse and an ascetic. The sight of the aged, diseased and the dead caused him to\\n        reflect on the uncertainties and suffering in the lives of human beings. But upon seeing the ascetic, an\\n        individual seeking escape from the suffering, Prince Siddhattha was moved by that lifestyle and aspired to\\n        become ordained one day.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Soon after, Princess Yasodhara, the prince’s royal consort, gave birth to a son who was given the nameRahul,\\n        meaning ‘fetter’. This name was chosen because Prince Siddhattha realized that if he did not ordain now, his\\n        love and obligation to his wife and son would ultimately bound and prevent him from ever ordaining. That\\n        evening, he decided to leave the palace in order to ordain and search for the path to overcome suffering.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Six years after departing the palace to ordain and spending time searching arduously, Prince Siddhattha attained\\n        enlightenment under the Bodhi tree along the banks of Neranjara River on the full moon night of the sixth lunar\\n        month, and became the Buddha at the age of thirty-five. During the first meditative stage, he attained the\\n        ability to recount every past lifetime that he was ever born; in the middle stage he attained what is called\\n        ‘the divine eye’ and acquired the ability to see past lives of all living creatures in the cycle of existence,\\n        or samsara. In the final meditative stage, he was able to eliminate all his defilements through the wisdom he\\n        gained; Prince Siddhattha was now fully enlightened and became the Buddha. At the present day, the place where\\n        he attained enlightenment is in the town of Bodh Gaya, located in Gaya City in the Indian state of Bihar.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        His Attainment of Complete Nirvana\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        After attaining enlightenment, the Buddha taught about the nature of the world, or Dhamma, to the people for the\\n        next 45 years until he was 80. On the full moon night of the sixth month, as the Buddha rested in Kusinara City\\n        of the Malla Kingdom, he delivered his final discourse as follows: “Behold monks, naturally all conditioned\\n        things must undergo changes. Strive to work hard to benefit yourself and humankind, and by not being reckless.”\\n        He then entered Complete Nirvana on the full moon night of the sixth lunar month. The location where the Buddha\\n        attained Complete Nirvana is in Kushinagar District in the Indian state of Uttar Pradesh.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Visakha Puja Day (Vesak) and the United Nations\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        On 13 December 1999 (2542 B.E.), the General Assembly of the United Nations officially recognized Visakha Puja\\n        Day, or Vesak Day as traditionally known by Sri Lankans, as an International Day of the World. Sri Lanka was a\\n        key member of the original group of co-sponsors for a resolution requesting the United Nations to recognize\\n        Vesak as a special day. The goal is to make Vesak internationally known as the day Buddhists throughout the\\n        world assembled to perform meritorious deeds and to commemorate the Buddha’s Birth, Enlightenment, and\\n        Attainment of Complete Nibbana. It is also to acknowledge the Buddha as a benevolent human being endowed with\\n        great wisdom and immense compassion and goodwill for all living beings. The Buddha encouraged all religious\\n        groups to examine His teaching and to verify the truth for themselves, without the need to abandon their own\\n        faith. He taught and shared His great wisdom to all living beings without seeking anything in return.\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Dhammakaya temple and the Dhammakaya Foundation will organize Visakha Puja Day Ceremony (Vesak) as recognition\\n        of the boundless compassion of the Buddha, the Most Exalted One and Teacher to all humankind and celestial\\n        beings. You are warmly invited to participate in Visakha Puja Day Ceremony that includes the offering of\\n        donation, observation of the precepts, meditation practice and circumambulation of the Grand Meditation Stadium,\\n        as commemoration of the Buddha’s Birth, Enlightenment, and Attainment of Complete Nibbana. For more information,\\n        please contact us via our details on the \"],[6,[39,1],[\"contact\"],null,[[\"default\"],[[[[1,\"\\n        contact\"]],[]]]]],[1,\" page.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"activities\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to activities\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/activities/visakha-bucha.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "yN206b1Q",
    "block": "[[[10,\"nav\"],[14,0,\"navbar navbar-expand-md\"],[12],[1,\"\\n  \"],[8,[39,0],[[24,0,\"navbar-brand\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"img\"],[14,\"src\",\"assets/images/logo.png\"],[14,\"width\",\"30\"],[14,\"height\",\"30\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n  \"],[10,\"button\"],[14,0,\"navbar-toggler\"],[14,\"data-toggle\",\"collapse\"],[14,\"data-target\",\"#navbar-toggle\"],[14,\"aria-controls\",\"navbar-toggle\"],[14,\"aria-expanded\",\"false\"],[14,\"aria-label\",\"Toggle navigation\"],[14,4,\"button\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"navbar-toggler-icon\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"collapse navbar-collapse justify-content-center\"],[14,1,\"navbar-toggle\"],[12],[1,\"\\n    \"],[11,\"ul\"],[24,0,\"navbar-nav\"],[4,[38,1],[\"click\",[30,0,[\"collapseNav\"]]],null],[12],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"index\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"HOME\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"about-us\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"ABOUT US\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"teachings\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"TEACHINGS\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"activities\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"ACTIVITIES\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"news\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"NEWS\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"media\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"MEDIA\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"contact\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"CONTACT\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"faqs\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"FAQS\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,0],[[24,0,\"nav-item\"]],[[\"@route\",\"@tagName\"],[\"support\",\"li\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,3],[14,0,\"nav-link\"],[12],[1,\"SUPPORT\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,3],null,null],null,null,null],[1,\"\\n\"],[10,\"footer\"],[14,0,\"footer\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col lead\"],[12],[1,\"\\n        Dhammakaya Meditation Centre of Newcastle\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row text-muted\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col-12 col-sm-6 mt-3\"],[12],[1,\"\\n        \"],[10,\"address\"],[12],[1,\"\\n          Dhammakaya Meditation Centre of Newcastle\"],[10,\"br\"],[12],[13],[1,\"\\n          Church street\"],[10,\"br\"],[12],[13],[1,\"\\n          Hebburn, Tyne and Wear\"],[10,\"br\"],[12],[13],[1,\"\\n          NE31 1DR\"],[10,\"br\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,3],[14,6,\"tel:01914 203981\"],[12],[1,\"01914 203981\"],[13],[10,\"br\"],[12],[13],[1,\"\\n        \"],[10,3],[14,6,\"mailto:dmcnewcastle@gmail.com\"],[12],[1,\"dmcnewcastle@gmail.com\"],[13],[10,\"br\"],[12],[13],[1,\"\\n        Charity number: 1174069\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col-12 col-sm-6 mt-3\"],[12],[1,\"\\n        World peace through inner peace. A non-profit organisation located in Hebburn, South Tyneside, whose purpose is\\n        to teach meditation for world peace.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[11,0],[24,1,\"app-modal\"],[4,[38,4],[[30,0,[\"setUIModalContainerElement\"]]],null],[12],[13]],[],false,[\"link-to\",\"on\",\"component\",\"-outlet\",\"did-insert\"]]",
    "moduleName": "dmc-website/templates/application.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/components/article-card", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "sdKRvGhK",
    "block": "[[[10,0],[14,0,\"card\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"card-header text-muted\"],[12],[1,\"\\n    \"],[10,\"small\"],[12],[1,[30,0,[\"dateText\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"img\"],[14,0,\"card-img-top\"],[15,\"src\",[30,1,[\"coverImage\"]]],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n  \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n    \"],[10,\"h4\"],[14,0,\"card-title\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n    \"],[10,2],[14,0,\"card-text\"],[12],[1,\"\\n      \"],[1,[30,1,[\"description\"]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,0],[[24,0,\"card-link\"]],[[\"@route\",\"@models\"],[\"news.article\",[28,[37,1],[[30,1,[\"year\"]],[30,1,[\"month\"]],[30,1,[\"day\"]],[30,1,[\"id\"]]],null]]],[[\"default\"],[[[[1,\"\\n      Read more\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@article\"],false,[\"link-to-and-scroll-nav\",\"array\"]]",
    "moduleName": "dmc-website/templates/components/article-card.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/components/bs-carousel", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ppFH9YS9",
    "block": "[[[10,0],[15,1,[30,1]],[14,0,\"carousel slide\"],[14,\"data-ride\",\"carousel\"],[12],[1,\"\\n  \"],[10,\"ol\"],[14,0,\"carousel-indicators\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,2]],null]],null],null,[[[41,[30,5],[[[41,[28,[37,3],[[30,5],[30,3]],null],[[[1,\"          \"],[10,\"li\"],[14,0,\"active\"],[15,\"data-target\",[29,[\"#\",[30,1]]]],[15,\"data-slide-to\",[30,4]],[12],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,\"li\"],[15,\"data-target\",[29,[\"#\",[30,1]]]],[15,\"data-slide-to\",[30,4]],[12],[13],[1,\"\\n\"]],[]]]],[]],[[[41,[30,4],[[[1,\"          \"],[10,\"li\"],[15,\"data-target\",[29,[\"#\",[30,1]]]],[15,\"data-slide-to\",[30,4]],[12],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,\"li\"],[14,0,\"active\"],[15,\"data-target\",[29,[\"#\",[30,1]]]],[15,\"data-slide-to\",[30,4]],[12],[13],[1,\"\\n\"]],[]]]],[]]]],[3,4]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"carousel-inner\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,2]],null]],null],null,[[[41,[30,5],[[[41,[28,[37,3],[[30,5],[30,6]],null],[[[1,\"          \"],[10,0],[14,0,\"carousel-item active\"],[12],[1,\"\\n            \"],[10,\"img\"],[14,0,\"d-block w-100\"],[15,\"src\",[30,6]],[15,\"alt\",[29,[\"Slide \",[30,7]]]],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,0],[14,0,\"carousel-item\"],[12],[1,\"\\n            \"],[10,\"img\"],[14,0,\"d-block w-100\"],[15,\"src\",[30,6]],[15,\"alt\",[29,[\"Slide \",[30,7]]]],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]]],[]],[[[41,[30,7],[[[1,\"          \"],[10,0],[14,0,\"carousel-item\"],[12],[1,\"\\n            \"],[10,\"img\"],[14,0,\"d-block w-100\"],[15,\"src\",[30,6]],[15,\"alt\",[29,[\"Slide \",[30,7]]]],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,0],[14,0,\"carousel-item active\"],[12],[1,\"\\n            \"],[10,\"img\"],[14,0,\"d-block w-100\"],[15,\"src\",[30,6]],[15,\"alt\",[29,[\"Slide \",[30,7]]]],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]]],[]]]],[6,7]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,3],[14,0,\"carousel-control-prev\"],[15,6,[29,[\"#\",[30,1]]]],[14,\"role\",\"button\"],[14,\"data-slide\",\"prev\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"carousel-control-prev-icon\"],[14,\"aria-hidden\",\"true\"],[12],[13],[1,\"\\n    \"],[10,1],[14,0,\"sr-only\"],[12],[1,\"Previous\"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,3],[14,0,\"carousel-control-next\"],[15,6,[29,[\"#\",[30,1]]]],[14,\"role\",\"button\"],[14,\"data-slide\",\"next\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"carousel-control-next-icon\"],[14,\"aria-hidden\",\"true\"],[12],[13],[1,\"\\n    \"],[10,1],[14,0,\"sr-only\"],[12],[1,\"Next\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@carouselId\",\"@imageSources\",\"imageSrc\",\"index\",\"@selected\",\"imageSrc\",\"index\"],false,[\"each\",\"-track-array\",\"if\",\"eq\"]]",
    "moduleName": "dmc-website/templates/components/bs-carousel.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/components/bs-modal", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "EFubLIXj",
    "block": "[[[11,0],[24,0,\"modal fade\"],[24,1,\"bs-modal\"],[24,\"tabindex\",\"-1\"],[24,\"role\",\"dialog\"],[24,\"aria-hidden\",\"true\"],[4,[38,0],[[30,0,[\"onDidInsert\"]]],null],[4,[38,1],[[30,0,[\"onWillDestroy\"]]],null],[12],[1,\"\\n  \"],[10,0],[14,0,\"modal-dialog modal-lg\"],[14,\"role\",\"document\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"modal-content\"],[12],[1,\"\\n      \"],[18,1,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"&default\"],false,[\"did-insert\",\"will-destroy\",\"yield\"]]",
    "moduleName": "dmc-website/templates/components/bs-modal.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/components/hide-after", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "T5Ls2KW2",
    "block": "[[[41,[51,[30,0,[\"hide\"]]],[[[1,\"  \"],[18,1,null],[1,\"\\n\"]],[]],null]],[\"&default\"],false,[\"unless\",\"yield\"]]",
    "moduleName": "dmc-website/templates/components/hide-after.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/components/img-banner", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "3p21KOeX",
    "block": "[[[10,0],[14,0,\"image-banner\"],[15,5,[30,0,[\"style\"]]],[12],[1,\"\\n  \"],[10,0],[14,0,\"image-banner_content d-flex align-items-center\"],[12],[1,\"\\n    \"],[18,1,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"&default\"],false,[\"yield\"]]",
    "moduleName": "dmc-website/templates/components/img-banner.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/contact", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "JJwex+E9",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/contact-us_cover.jpg\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"CONTACT\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid text-center\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col p-5\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Contact us\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-12 col-md-4 mb-5\"],[12],[1,\"\\n      \"],[10,\"svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 32 32\"],[14,\"width\",\"32\"],[14,\"height\",\"32\"],[12],[1,\"\\n        \"],[10,\"path\"],[14,\"d\",\"M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Address\"],[13],[1,\"\\n      \"],[10,\"address\"],[12],[1,\"\\n        \"],[10,\"strong\"],[12],[1,\"Dhammakaya Meditation Centre of Newcastle\"],[10,\"br\"],[12],[13],[13],[1,\"\\n        Church Street\"],[10,\"br\"],[12],[13],[1,\"\\n        Hebburn\"],[10,\"br\"],[12],[13],[1,\"\\n        Tyne and Wear\"],[10,\"br\"],[12],[13],[1,\"\\n        NE31 1DR\"],[10,\"br\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-4 mb-5\"],[12],[1,\"\\n      \"],[10,\"svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 32 32\"],[14,\"width\",\"32\"],[14,\"height\",\"32\"],[12],[1,\"\\n        \"],[10,\"path\"],[14,\"d\",\"M29 4h-26c-1.65 0-3 1.35-3 3v20c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-20c0-1.65-1.35-3-3-3zM12.461 17.199l-8.461 6.59v-15.676l8.461 9.086zM5.512 8h20.976l-10.488 7.875-10.488-7.875zM12.79 17.553l3.21 3.447 3.21-3.447 6.58 8.447h-19.579l6.58-8.447zM19.539 17.199l8.461-9.086v15.676l-8.461-6.59z\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Email\"],[13],[1,\"\\n      \"],[10,3],[14,6,\"mailto:dmcnewcastle@gmail.com\"],[12],[1,\"dmcnewcastle@gmail.com\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-6 col-md-4 mb-5\"],[12],[1,\"\\n      \"],[10,\"svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 32 32\"],[14,\"width\",\"32\"],[14,\"height\",\"32\"],[12],[1,\"\\n        \"],[10,\"path\"],[14,\"d\",\"M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Tel\"],[13],[1,\"\\n      \"],[10,3],[14,6,\"tel:01914 203981\"],[12],[1,\"01914 203981\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col p-5\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Find us on\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-12 col-md-6 mb-5\"],[12],[1,\"\\n      \"],[10,\"svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 24 24\"],[14,\"width\",\"32\"],[14,\"height\",\"32\"],[12],[1,\"\\n        \"],[10,\"path\"],[14,\"d\",\"M23.978 20.238c-.304-1.931-3.874-.444-4.096-2.559-.313-2.998 4.15-9.459 3.797-11.972-.313-2.255-1.841-2.73-3.165-2.756-1.284-.02-1.623.182-2.058.435-.253.146-.612.435-1.112-.041-.334-.318-.557-.536-.905-.819-.182-.142-.466-.324-.945-.395-.476-.071-1.098 0-1.492.167-.395.172-.702.466-1.026.749-.323.283-1.147 1.198-1.911.859-.335-.145-1.458-.706-2.272-1.055-1.563-.677-3.822.42-4.636 1.866C2.944 6.866.557 15.32.193 16.432c-.809 2.502 1.032 4.54 3.509 4.424 1.052-.051 1.75-.43 2.412-1.638.384-.693 3.979-10.087 4.248-10.543.197-.323.844-.753 1.39-.475.551.283.662.869.581 1.421-.136.895-2.669 6.629-2.771 7.275-.162 1.103.359 1.714 1.507 1.774.784.041 1.567-.237 2.184-1.41.349-.652 4.349-8.666 4.702-9.202.39-.586.703-.779 1.103-.758.309.015.799.096.678 1.016-.122.905-3.343 6.78-3.676 8.221-.456 1.927.602 3.874 2.341 4.728 1.112.546 5.97 1.476 5.577-1.027z\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Meetup\"],[13],[1,\"\\n      \"],[10,3],[14,6,\"https://www.meetup.com/Meditation-Newcastle/\"],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"https://www.meetup.com/Meditation-Newcastle/\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-sm-12 col-md-6 mb-5\"],[12],[1,\"\\n      \"],[10,\"svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 24 24\"],[14,\"width\",\"32\"],[14,\"height\",\"32\"],[12],[1,\"\\n        \"],[10,\"path\"],[14,\"d\",\"M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"Facebook\"],[13],[1,\"\\n      \"],[10,3],[14,6,\"https://www.facebook.com/dhammakayameditationcentreofnewcastle/\"],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"Dhammakaya Meditation Centre of Newcastle\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\"]]",
    "moduleName": "dmc-website/templates/contact.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/faqs", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "2yeqhvM1",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/faq_cover.jpg\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"FAQ\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 px-5\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"What is meditation?\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Meditation is a mind training technique to develop mental quality. It is something we can incorporate\\n        into our daily life, allowing us to improve the quality of the mind and the body. Meditation is not only\\n        for monks or priests but is a practice for anyone who would like to improve their quality of life.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 px-5\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,\"What is Dhammakaya meditation?\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Dhammakaya meditation is one of several meditation techniques which has been practiced in Asia for over\\n        two thousand five hundred years. It is effective and easy to learn. Everyone, regardless of age, race\\n        or beliefs, can obtain the benefits from this technique.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"img-banner\"]]",
    "moduleName": "dmc-website/templates/faqs.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "BO1AiESW",
    "block": "[[[8,[39,0],null,[[\"@src\",\"@contain\",\"@noRepeat\"],[\"assets/images/logo-text.png\",true,true]],null],[1,\"\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mb-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-lg-4 mt-5 px-5 animate-reveal\"],[12],[1,\"\\n      \"],[10,\"h3\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Who we are\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-justify\"],[12],[1,\"\\n        Dhammakaya Foundation is a non-profit organisation, based on personal development, aiming to promote activities\\n        for the restoration of morality in individuals, families, societies and the world\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-lg-4 mt-5 px-5 animate-reveal animate-delay-1\"],[12],[1,\"\\n      \"],[10,\"h3\"],[14,0,\"mb-3\"],[12],[1,\"\\n        What we do\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-justify\"],[12],[1,\"\\n        While many are searching for peace from without, we believe that world peace MUST begin from each and every one\\n        of us. That’s why we promote the use of meditation in order to help individuals cultivate inner peace inside\\n        themselves\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-lg-4 mt-5 px-5 animate-reveal animate-delay-2\"],[12],[1,\"\\n      \"],[10,\"h3\"],[14,0,\"mb-3\"],[12],[1,\"\\n        Join our activities\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-justify\"],[12],[1,\"\\n        You can join different activities such as Buddhist ceremonies, meditation retreats and Dhamma studies in\\n        Thailand and in any of our worldwide centres\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[8,[39,0],null,[[\"@src\"],[\"assets/images/index_cover.jpg\"]],null],[1,\"\\n\"]],[],false,[\"img-banner\"]]",
    "moduleName": "dmc-website/templates/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/media", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "BViZyjwM",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/media_cover.jpg\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"MEDIA\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"    \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col px-5\"],[12],[1,\"\\n        \"],[10,\"h2\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row media-row d-flex align-items-center\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,1,[\"imageSources\"]]],null]],null],null,[[[1,\"        \"],[11,0],[24,0,\"media-image text-center mx-1 my-5\"],[24,\"role\",\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"selectAlbumAndImage\"]],[30,1],[30,2]],null]],null],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"img-fluid img-thumbnail\"],[15,\"src\",[30,2]],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[2]],null],[1,\"    \"],[13],[1,\"\\n\"]],[1]],null],[13],[1,\"\\n\\n\"],[41,[30,0,[\"selectedAlbum\"]],[[[40,[[[1,\"    \"],[8,[39,8],null,[[\"@onDismissed\"],[[28,[37,4],[[30,0,[\"selectAlbumAndImage\"]],null,null],null]]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"modal-header\"],[12],[1,\"\\n        \"],[10,\"h5\"],[14,0,\"modal-title\"],[14,1,\"carousel-modal-label\"],[12],[1,[30,0,[\"selectedAlbum\",\"title\"]]],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"close\"],[14,\"data-dismiss\",\"modal\"],[14,\"aria-label\",\"Close\"],[14,4,\"button\"],[12],[1,\"\\n          \"],[10,1],[14,\"aria-hidden\",\"true\"],[12],[1,\"×\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"modal-body\"],[12],[1,\"\\n        \"],[8,[39,9],null,[[\"@carouselId\",\"@imageSources\",\"@selected\"],[\"media-carousel\",[30,0,[\"selectedAlbum\",\"imageSources\"]],[30,0,[\"selectedImage\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-secondary\"],[14,\"data-dismiss\",\"modal\"],[14,4,\"button\"],[12],[1,\"Close\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],\"%cursor:0%\",[28,[37,7],[[30,0,[\"ui\",\"modalContainerElement\"]]],null]]],[]],null]],[\"album\",\"imageSrc\"],false,[\"img-banner\",\"each\",\"-track-array\",\"on\",\"fn\",\"if\",\"in-element\",\"-in-el-null\",\"bs-modal\",\"bs-carousel\"]]",
    "moduleName": "dmc-website/templates/media.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/news/article", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "w3ILboMg",
    "block": "[[[8,[39,0],null,[[\"@src\"],[[30,0,[\"model\",\"data\",\"coverImage\"]]]],null],[1,\"\\n\"],[10,0],[14,0,\"container-fluid px-5\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,[30,0,[\"model\",\"data\",\"title\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[1,[30,0,[\"safeContent\"]]],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"news\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to news\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/news/article.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/news/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "SBUyWuVB",
    "block": "[[[8,[39,0],null,[[\"@src\"],[\"assets/images/news_cover.jpg\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"NEWS\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"recentToOldArticles\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-12 col-sm-6 col-md-4 col-lg-3 py-5\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@article\"],[[30,1]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"article\"],false,[\"img-banner\",\"each\",\"-track-array\",\"article-card\"]]",
    "moduleName": "dmc-website/templates/news/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/support", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "CH6jZ5mi",
    "block": "[[[8,[39,0],null,[[\"@src\",\"@backgroundPosition\"],[\"assets/images/support_cover.jpeg\",\"right center\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"SUPPORT\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col lead my-5\"],[12],[1,\"\\n      Wat Phra Dhammakaya Newcastle is operating as a non-profit organization. We aim to promote Dhamma knowledge and\\n      morality by giving everyone in the world the opportunity to practice meditation, and discover true happiness.\\n      Meditation is something that can be practiced by anyone daily. Meditation gives rise to inner peace and inner\\n      peace leads to world peace.\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"h1\"],[12],[1,\"Donations\"],[13],[1,\"\\n  \"],[10,0],[14,0,\"col-12 text-center mt-3\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      You can donate at your discretion via the donate button below\"],[10,\"br\"],[12],[13],[1,\"Sathu 🙏\\n    \"],[13],[1,\"\\n    \"],[10,\"form\"],[14,\"action\",\"https://www.paypal.com/donate\"],[14,\"method\",\"post\"],[14,\"target\",\"_blank\"],[12],[1,\"\\n      \"],[10,\"input\"],[14,3,\"hosted_button_id\"],[14,2,\"2CYLN39RHDUVS\"],[14,4,\"hidden\"],[12],[13],[1,\"\\n      \"],[10,\"input\"],[14,\"src\",\"https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif\"],[14,\"border\",\"0\"],[14,3,\"submit\"],[14,\"title\",\"PayPal - The safer, easier way to pay online!\"],[14,\"alt\",\"Donate with PayPal button\"],[14,4,\"image\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"img\"],[14,0,\"img-fluid mt-3\"],[14,\"src\",\"assets/images/teachings/paypal-qr-code.jpeg\"],[14,\"alt\",\"Paypal QR code\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,2],[12],[1,\"Alternatively, bank transfer is available via the details below\"],[13],[1,\"\\n  \"],[10,2],[12],[1,\"\\n    Lloyds\"],[10,\"br\"],[12],[13],[1,\"\\n    Name: DNUK\"],[10,\"br\"],[12],[13],[1,\"\\n    Acc no: 38694368\"],[10,\"br\"],[12],[13],[1,\"\\n    Sort code: 30-90-89\"],[10,\"br\"],[12],[13],[1,\"\\n\\n    Swift code: LOYDGB2125\"],[10,\"br\"],[12],[13],[1,\"\\n    IBAN: GB40LOYD30908938694368\"],[10,\"br\"],[12],[13],[1,\"\\n    Address: 15 Blackheath Village, London, SE3 9LH\"],[10,\"br\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Note: Please use \\\"meditation\\\" as the payment reference to allow us to review transactions easily.\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"img-banner\"]]",
    "moduleName": "dmc-website/templates/support.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/teachings/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "DLZGH33y",
    "block": "[[[8,[39,0],null,[[\"@src\",\"@backgroundPosition\"],[\"assets/images/teachings_cover.jpg\",\"top center\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"TEACHINGS\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 lead my-5 px-5 text-center\"],[12],[1,\"\\n      Please check class availability here: \"],[10,3],[14,\"target\",\"_blank\"],[14,6,\"https://www.meetup.com/meditation-newcastle/\"],[12],[1,\"https://www.meetup.com/meditation-newcastle/\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 mb-3 px-5 text-center\"],[12],[1,\"\\n      Every week, group meditation and short teachings are conducted by experienced Theravada Buddhist monks. All\\n      are welcome to learn meditation together, and to meet other meditators.\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-6 col-lg-4 mt-4 px-4\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[1,\"Meditation for Relaxation\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-muted\"],[12],[1,\"Beginner meditation classes\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Tuesday night\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"7.00 - 8.30pm\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Difficulty: *\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-6 col-lg-4 mt-4 px-4\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[1,\"Buddhist Chanting and Meditation\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Thursday night\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"7.00 - 8.30pm\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Difficulty: **\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-6 col-lg-4 mt-4 px-4\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[1,\"Meditation via Zoom\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-muted\"],[12],[1,\"Beginner meditation classes\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Saturday night\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"7.00 - 8.20pm\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Difficulty: *\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 col-md-6 col-lg-4 mt-4 px-4\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[1,\"Weekend Meditation\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Sunday\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"2.30 - 4.00pm\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"Difficulty: *\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12 mt-5 px-5 text-center text-muted\"],[12],[1,\"\\n      \"],[10,0],[12],[1,\"* This class does not require any prior meditation experience. Everyone is welcome.\"],[13],[1,\"\\n      \"],[10,0],[12],[1,\"** This class does require some meditation experience. You should have a good understanding of how to practice meditation.\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12 text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"teachings.meditation-benefits\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary mt-1\"],[14,4,\"button\"],[12],[1,\"\\n          Learn more about the benefits\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"support\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary mt-1\"],[14,4,\"button\"],[12],[1,\"\\n          Support the temple\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/teachings/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/teachings/meditation-benefits", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "uBdG7pBx",
    "block": "[[[8,[39,0],null,[[\"@src\",\"@backgroundPosition\"],[\"assets/images/teachings/meditation-benefits_banner.jpg\",\"top center\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"h1\"],[14,0,\"display-3 image-banner_display\"],[12],[1,\"MEDITATION BENEFITS\"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row mt-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"lead\"],[12],[1,\"Allow yourself to slow down and find inner peace within.\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"lead\"],[12],[1,\"Quite simply, meditation helps you to:\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"ul\"],[14,0,\"list-group list-group-flush align-items-center\"],[12],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Reduce feelings of anxiety, stress, and being overwhelmed\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Get greater clarity of mind and perspective in life\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Turn off the mental chatter and experience peace of mind\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Feel emotionally well, centred, and happy\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Become more resilient to challenges in relationships and life\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Be liberated from fears and needless worries\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Be less reactive, less irritable, less triggered\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Be more empowered to be yourself and manifest your potential\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Develop the ability to focus and avoid procrastination/distraction\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Accept yourself, accept others, and accept things you cannot change\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"list-group-item\"],[12],[1,\"Grow and awaken spiritually\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row mt-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"lead\"],[12],[1,\"Imagine how your life would be, if you embraced these benefits...\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col text-center\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\"],[\"teachings\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-outline-primary\"],[14,4,\"button\"],[12],[1,\"\\n          Back to teachings\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"img-banner\",\"link-to-and-scroll-nav\"]]",
    "moduleName": "dmc-website/templates/teachings/meditation-benefits.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/templates/teachings/meditation-retreat", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "7Uq+UAgZ",
    "block": "[[[10,0],[14,0,\"container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h1\"],[12],[1,\"Meditation Retreat\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row my-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"What do you learn?\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        During 3 days retreat participants will learn how to meditate in a peaceful environment with a Buddhist monk.\\n        Meditation technique is The Middle Way, known as Dhammakaya technique in Thailand. This technique emphasis is\\n        on comfort. Within a comfortable environment people’s mind can become really calm and peaceful.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        General session will be with teaching and meditation practice. Coaching can be also given during the session\\n        or at personal request to guide and tune the mind effectively. Participants are encouraged to ask questions\\n        concerning meditation, how to apply into everyday life and Buddhism from teaching monks.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        It’s a balance between spiritual self discipline to practice oneself, wake up early, take two meals a day and\\n        comfort of accommodation, nature, food and meditation technique.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"Overview\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        People with any religious backgrounds (or none) are welcomed at our retreat. The minimum age requirement is\\n        18. We request that all participants be in a good state of health and comfortable in rustic surroundings with\\n        a genuine desire to learn and practice meditation in our established program. All participants are requested\\n        to abstain from smoking or drinking alcohol and take two meals a day to support your meditation practice. The\\n        Meditation Retreat is run by a Buddhist Charity based in the UK which promotes world peace through inner\\n        peace.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"Fees\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Fees are kept to a minimum and will be used just for the cost of the retreat. The Standard Rate for the\\n        retreat is £75. This fee covers all meals and accommodation. If you cannot afford the Standard Rate please\\n        talk to us and we will offer you a supported rate. The Sponsor Rate is £100. This is a benefactor rate which\\n        helps others to come to the retreat who cannot afford the Standard Rate.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"Payment method\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Payment must made in fully\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"by cash (directly at the Meditation Centre in Hebburn)\"],[13],[1,\"\\n        or\\n        \"],[10,\"li\"],[12],[1,\"\\n          by bank transfer to Dhammakaya North United Kingdom (DNUK), Lloyds Bank plc\\n          \"],[10,\"br\"],[12],[13],[1,\"Sort Code: 30-90-89\\n          \"],[10,\"br\"],[12],[13],[1,\"Account No: 38694368\\n          \"],[10,\"br\"],[12],[13],[1,\"Reference: MedRet (YOUR NAME)\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"Registration is open until Friday, 10th February 2023\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        However, places are limited and will be on a first come first serve basis. Cancellation made one week before\\n        the retreat will receive a full refund otherwise refunds can not be claimed. For more information please\\n        contact \"],[10,3],[14,6,\"tel:01914203981\"],[12],[1,\"01914 203981\"],[13],[1,\" or \"],[10,3],[14,6,\"tel:07462328325\"],[12],[1,\"07462 328 325\"],[13],[1,\" or e-mail us at\\n        \"],[10,3],[14,6,\"mailto:dmcnewcastle@gmail.com\"],[12],[1,\"dmcnewcastle@gmail.com\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"What to bring?\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n      \"],[10,\"ul\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Personal items, bathing equipment and towels\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Personal medication\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Warm clothing\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"\\n          Loose, simple, and comfortable clothing, preferably in white or light colours (Sleeveless shirts and\\n          shorts see-through, or revealing clothing should not be worn in the retreat)\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Individual bottle / flask for water\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"Application\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        Should you be interested in joining this retreat, please follow these steps:\\n      \"],[10,\"ol\"],[12],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Fill in the online application form at \"],[10,3],[14,6,\"https://bit.ly/nclretwin23\"],[12],[1,\"https://bit.ly/nclretwin23\"],[13],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Wait until we contact you for confirmation via email.\"],[13],[1,\"\\n        \"],[10,\"li\"],[12],[1,\"Make a payment to confirm your place.\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dmc-website/templates/teachings/meditation-retreat.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dmc-website/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("dmc-website/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("dmc-website/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("dmc-website/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('dmc-website/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("dmc-website/app")["default"].create({"name":"dmc-website","version":"0.0.0+437c57d7"});
          }
        
//# sourceMappingURL=dmc-website.map
